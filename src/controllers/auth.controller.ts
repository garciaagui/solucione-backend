import AuthService from '@/services/auth.service'
import { LoginRequest, RegisterRequest } from '@/types/auth'
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

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password }: RegisterRequest = req.body
      const response = await this.service.register(name, email, password)
      return res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }
}
