import { UserBasicInfo } from './user'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: UserBasicInfo
  token: string
}
