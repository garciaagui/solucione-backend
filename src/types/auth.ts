import { Role } from '@prisma/client'
import { UserBasicInfo } from './user'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  data: {
    user: {
      role: Role
    } & UserBasicInfo
  }
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

export interface UpdateUserData {
  name: string
  password: string
  role: Role
  verifyToken: string
}

export interface CreateUserData extends UpdateUserData {
  email: string
}
