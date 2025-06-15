import { UserBasicInfo } from '@/types/user'
import { UnauthorizedException } from '@/utils/exceptions'
import { verifyAuthToken } from '@/utils/jwt'
import { NextFunction, Request, Response } from 'express'

interface AuthenticatedRequest extends Request {
  user?: UserBasicInfo
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.authToken

    if (!token) {
      throw new UnauthorizedException('Token de acesso requerido')
    }

    const decoded = verifyAuthToken(token)
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    }

    next()
  } catch (error) {
    next(error)
  }
}
