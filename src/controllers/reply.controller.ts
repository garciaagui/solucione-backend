import ReplyService from '@/services/reply.service'
import { AuthenticatedRequest } from '@/types/api'
import { NextFunction, Response } from 'express'

export default class ReplyController {
  constructor(private readonly service: ReplyService) {}

  public async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const user = req.user!
    const textData = req.body

    const fileData = req.files as Express.Multer.File[]
    const image =
      fileData && fileData.length > 0
        ? {
            buffer: fileData[0].buffer,
            name: fileData[0].originalname,
          }
        : undefined

    try {
      const data = { image, text: textData, user }
      const created = await this.service.create(data)

      return res.status(201).json({
        message: 'Resposta criada e reclamação atualizada com sucesso',
        data: created,
      })
    } catch (error) {
      next(error)
    }
  }
}
