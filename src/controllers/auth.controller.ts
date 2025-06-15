import AuthService from '@/services/auth.service'
import { LoginRequest, RegisterRequest } from '@/types/auth'
import { NextFunction, Request, Response } from 'express'

export default class AuthController {
  constructor(private readonly service: AuthService) {}

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: LoginRequest = req.body
      const { response, token } = await this.service.login(email, password)

      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24h
        path: '/api',
      })

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

  public async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.query.token as string
      const response = await this.service.verifyEmail(token)
      return res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
}
