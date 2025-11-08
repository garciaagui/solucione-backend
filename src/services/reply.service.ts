import ReplyModel from '@/models/reply.model'
import { CreateReplyRequest, ReplyWithRelations } from '@/types/reply'
import { validateComplaintStatusForUpdate } from '@/validations/complaint'
import { validateReplyCreation } from '@/validations/reply'
import { validateAdminRole } from '@/validations/role'
import { Status } from '@prisma/client'
import { UUID } from 'crypto'
import ComplaintService from './complaint.service'
import S3Service from './s3.service'

export default class ReplyService {
  private s3Service: S3Service

  constructor(
    private readonly model: ReplyModel,
    private readonly complaintService: ComplaintService,
  ) {
    this.s3Service = new S3Service()
  }

  public async create(data: CreateReplyRequest): Promise<ReplyWithRelations> {
    const { image, text, user } = data
    const { description, complaintId } = text

    validateAdminRole(user.role, 'Apenas administradores podem criar respostas e atualizar status')
    validateReplyCreation(text)

    const complaint = await this.complaintService.findById(complaintId)

    validateComplaintStatusForUpdate(complaint.status)

    const newStatus = complaint.status === Status.Aberto ? Status.Andamento : Status.Finalizado

    const images: string[] = []

    if (image) {
      const imageUrl = await this.s3Service.uploadImage(image.buffer, image.name)
      images.push(imageUrl)
    }

    const replyData = {
      description,
      userId: user.id as UUID,
      complaintId,
      complaintStatus: newStatus,
    }

    const createdReply = await this.model.create(replyData, images)
    await this.complaintService.updateStatus(complaintId, newStatus)

    return createdReply
  }
}
