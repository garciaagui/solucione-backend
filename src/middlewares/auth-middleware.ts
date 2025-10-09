import { UserBasicInfo } from '@/types/user'
import { UnauthorizedException } from '@/utils/exceptions'
import { verifyAuthToken } from '@/utils/jwt'
import { NextFunction, Request, Response } from 'express'

interface AuthenticatedRequest extends Request {
  user?: UserBasicInfo
}

export default function authMiddleware(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.authToken

    if (!token) {
      throw new UnauthorizedException('Token de autenticação não encontrado')
    }

    const decoded = verifyAuthToken(token)

    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    }

    next()
  } catch (error) {
    next(error)
  }
}
