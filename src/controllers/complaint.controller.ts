import ComplaintService from '@/services/complaint.service'
import { AuthenticatedRequest } from '@/types/api'
import { UUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'

export default class ComplaintController {
  constructor(private readonly service: ComplaintService) {}

  public async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.findAll()
      return res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as UUID
      const response = await this.service.findById(id)
      return res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  public async findUserComplaints(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!
      const response = await this.service.findUserComplaints(user)

      return res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  public async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const user = req.user!
    const textData = req.body

    const fileData = req.files as Express.Multer.File[]
    const image = {
      buffer: fileData[0].buffer,
      name: fileData[0].originalname,
    }

    try {
      const data = { image, text: textData, user }
      const created = await this.service.create(data)

      return res.status(201).json({
        message: 'Reclamação criada com sucesso',
        data: created,
      })
    } catch (error) {
      next(error)
    }
  }
}
