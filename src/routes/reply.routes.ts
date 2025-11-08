import ReplyController from '@/controllers/reply.controller'
import ComplaintModel from '@/models/complaint.model'
import ReplyModel from '@/models/reply.model'
import ComplaintService from '@/services/complaint.service'
import ReplyService from '@/services/reply.service'
import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response, Router } from 'express'

import { authMiddleware, multerMiddleware } from '@/middlewares'

const router = Router()
const prisma = new PrismaClient()

const complaintModel = new ComplaintModel(prisma)
const complaintService = new ComplaintService(complaintModel)
const replyModel = new ReplyModel(prisma)
const replyService = new ReplyService(replyModel, complaintService)
const controller = new ReplyController(replyService)

router.post(
  '/',
  authMiddleware,
  multerMiddleware.any(),
  (req: Request, res: Response, next: NextFunction) => {
    controller.create(req, res, next)
  },
)

export default router
