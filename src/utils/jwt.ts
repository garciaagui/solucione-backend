import { UserBasicInfo } from '@/types/user'
import jwt, { SignOptions } from 'jsonwebtoken'

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

export const verifyToken = (token: string): UserBasicInfo => {
  return jwt.verify(token, JWT_SECRET) as UserBasicInfo
}
