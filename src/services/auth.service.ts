import AuthModel from '@/models/auth.model'
import { LoginResponse } from '@/types/auth'
import { UserBasicInfo } from '@/types/user'
import { UnauthorizedException } from '@/utils/exceptions'
import { generateToken } from '@/utils/jwt'
import { validateLogin } from '@/validations/auth'
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
    }

    const token = generateToken(userBasicInfo)

    return {
      user: userBasicInfo,
      token,
    }
  }
}
