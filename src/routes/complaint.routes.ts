import ComplaintController from '@/controllers/complaint.controller'
import ComplaintModel from '@/models/complaint.model'
import ComplaintService from '@/services/complaint.service'
import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response, Router } from 'express'

import { authMiddleware, multerMiddleware } from '@/middlewares'

const router = Router()
const prisma = new PrismaClient()

const model = new ComplaintModel(prisma)
const service = new ComplaintService(model)
const controller = new ComplaintController(service)

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  controller.findAll(req, res, next)
})

router.get('/user', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  controller.findUserComplaints(req, res, next)
})

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  controller.findById(req, res, next)
})

router.post(
  '/',
  authMiddleware,
  multerMiddleware.any(),
  (req: Request, res: Response, next: NextFunction) => {
    controller.create(req, res, next)
  },
)

export default router
