import { Role } from '@prisma/client'
import { UserBasicInfo } from './user'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  response: {
    message: string
    user: UserBasicInfo
  }
  token: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  data: {
    user: UserBasicInfo
  }
}

export interface VerifyEmailResponse {
  message: string
}

export interface LogoutResponse {
  message: string
}

export interface MeResponse {
  message: string
  user: UserBasicInfo
}

export interface UpdateUserData {
  name: string
  password: string
  role: Role
  verifyToken: string | null
  emailVerified: boolean
}

export interface CreateUserData extends UpdateUserData {
  email: string
  avatar: string
}
