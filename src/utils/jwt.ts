import { UserBasicInfo } from '@/types/user'
import jwt, { SignOptions, TokenExpiredError } from 'jsonwebtoken'
import { BadRequestException, UnauthorizedException } from './exceptions'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_ALGORITHM = 'HS256'

export const generateLoginToken = (user: UserBasicInfo): string => {
  const jwtConfig: SignOptions = {
    expiresIn: '24h',
    algorithm: JWT_ALGORITHM,
  }

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  }

  const token = jwt.sign(payload, JWT_SECRET, jwtConfig)
  return token
}

export const generateRegisterToken = (email: string): string => {
  const jwtConfig: SignOptions = {
    expiresIn: '10m',
    algorithm: JWT_ALGORITHM,
  }

  const payload = {
    email,
  }

  const token = jwt.sign(payload, JWT_SECRET, jwtConfig)
  return token
}

export const verifyRegisterToken = (token: string | null): string => {
  if (!token) {
    throw new BadRequestException('Token de verificação não encontrado')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string }
    return decoded.email
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token de verificação expirado')
    }

    throw new UnauthorizedException('Token de verificação inválido')
  }
}
