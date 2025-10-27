import AuthModel from '@/models/auth.model'
import {
  LoginResponse,
  LogoutResponse,
  MeResponse,
  RegisterResponse,
  VerifyEmailResponse,
} from '@/types/auth'
import { UserBasicInfo } from '@/types/user'
import { ConflictException, NotFoundException, UnauthorizedException } from '@/utils/exceptions'
import { generateAuthToken, verifyRegisterToken } from '@/utils/jwt'
import { validateLogin, validateRegister } from '@/validations/auth'
import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'

export default class AuthService {
  constructor(private readonly model: AuthModel) {}

  public async login(email: string, password: string): Promise<LoginResponse> {
    validateLogin(email, password)

    const user = await this.model.findUserByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos')
    }

    const userBasicInfo: UserBasicInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    }

    const token = generateAuthToken(userBasicInfo)

    const response = {
      message: 'Login realizado com sucesso',
      user: userBasicInfo,
    }

    return { response, token }
  }

  public async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    validateRegister(name, email, password)

    const existingUser = await this.model.findUserByEmail(email)

    if (existingUser && existingUser.emailVerified) {
      throw new ConflictException('Já existe um usuário com este e-mail')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    // const token = generateRegisterToken(email)

    const userData = {
      name,
      password: hashedPassword,
      role: Role.user,
      verifyToken: null,
      emailVerified: true,
    }

    // let newUser

    // if (existingUser && !existingUser.emailVerified) {
    //   newUser = await this.model.updateUser(email, userData)
    // } else {
    //   newUser = await this.model.createUser({ ...userData, email })
    // }

    const newUser = await this.model.createUser({ ...userData, email })

    // await sendVerificationEmail(name, email, token)

    const userBasicInfo: UserBasicInfo = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
    }

    return {
      // message: 'Usuário cadastrado. Verifique seu e-mail.',
      message: 'Usuário cadastrado com sucesso.',
      data: {
        user: userBasicInfo,
      },
    }
  }

  public async verifyEmail(token: string): Promise<VerifyEmailResponse> {
    const email = verifyRegisterToken(token)
    const user = await this.model.findUserByEmail(email)

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    if (user.emailVerified) {
      return { message: 'E-mail já verificado.' }
    }

    await this.model.verifyUserEmail(email)

    return { message: 'E-mail verificado com sucesso.' }
  }

  public async logout(): Promise<LogoutResponse> {
    console.log('👤 Logout realizado')

    return { message: 'Logout realizado com sucesso.' }
  }

  public async me(email: string): Promise<MeResponse> {
    const user = await this.model.findUserByEmail(email)

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const userBasicInfo: UserBasicInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    }

    return {
      message: 'Usuário autenticado',
      user: userBasicInfo,
    }
  }
}
