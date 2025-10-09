import AuthController from '@/controllers/auth.controller'
import { authMiddleware } from '@/middlewares'
import AuthModel from '@/models/auth.model'
import AuthService from '@/services/auth.service'
import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response, Router } from 'express'

const router = Router()
const prisma = new PrismaClient()

const model = new AuthModel(prisma)
const service = new AuthService(model)
const controller = new AuthController(service)

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  controller.login(req, res, next)
})

router.post('/logout', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  controller.logout(req, res, next)
})

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  controller.register(req, res, next)
})

router.get('/verify-email', (req: Request, res: Response, next: NextFunction) => {
  controller.verifyEmail(req, res, next)
})

router.get('/me', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  controller.me(req, res, next)
})

export default router
