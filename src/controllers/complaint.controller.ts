import ComplaintService from '@/services/complaint.service'
import { UUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'

export default class ComplaintController {
  constructor(private readonly service: ComplaintService) {}

  public async findAll(req: Request, res: Response, next: NextFunction) {
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
}
