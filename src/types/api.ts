import { Request } from 'express'
import { UserBasicInfo } from './user'

export interface AuthenticatedRequest extends Request {
  user?: UserBasicInfo
}
