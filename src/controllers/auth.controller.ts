import AuthService from '@/services/auth.service'
import { LoginRequest } from '@/types/auth'
import { NextFunction, Request, Response } from 'express'

export default class AuthController {
  constructor(private readonly service: AuthService) {}

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: LoginRequest = req.body
      const response = await this.service.login(email, password)

      return res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
}
