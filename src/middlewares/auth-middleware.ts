import { AuthenticatedRequest } from '@/types/api'
import { UnauthorizedException } from '@/utils/exceptions'
import { verifyAuthToken } from '@/utils/jwt'
import { NextFunction, Response } from 'express'

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
