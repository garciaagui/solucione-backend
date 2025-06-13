import { UserBasicInfo } from '@/types/user'
import jwt, { SignOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME as SignOptions['expiresIn']

export const generateToken = (user: UserBasicInfo): string => {
  const jwtConfig: SignOptions = {
    expiresIn: JWT_EXPIRE_TIME,
    algorithm: 'HS256',
  }

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  }

  const token = jwt.sign(payload, JWT_SECRET, jwtConfig)
  return token
}

export const verifyToken = (token: string): UserBasicInfo => {
  return jwt.verify(token, JWT_SECRET) as UserBasicInfo
}
