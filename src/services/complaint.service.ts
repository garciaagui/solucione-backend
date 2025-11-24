import ComplaintModel from '@/models/complaint.model'
import { ComplaintWithRelations, CreateComplaintRequest } from '@/types/complaint'
import { UserBasicInfo } from '@/types/user'
import { NotFoundException } from '@/utils/exceptions'
import { validateComplaintCreation } from '@/validations/complaint'
import { validateId } from '@/validations/id'
import { validateUserRole } from '@/validations/role'
import { Status } from '@prisma/client'
import { UUID } from 'crypto'
import GeminiService from './gemini.service'
import S3Service from './s3.service'

export default class ComplaintService {
  private s3Service: S3Service
  private geminiService: GeminiService

  constructor(private readonly model: ComplaintModel) {
    this.s3Service = new S3Service()
    this.geminiService = new GeminiService()
  }

  public async findAll(): Promise<ComplaintWithRelations[]> {
    return this.model.findAll()
  }

  public async findUserComplaints(user: UserBasicInfo): Promise<ComplaintWithRelations[]> {
    const { id, role } = user
    const userId = id as UUID

    validateId(userId)

    if (role === 'user') {
      return this.model.findByUserId(userId)
    } else {
      return this.model.findRepliedByUserId(userId)
    }
  }

  public async findById(id: UUID): Promise<ComplaintWithRelations> {
    validateId(id)

    const complaint = await this.model.findById(id)

    if (!complaint) {
      throw new NotFoundException('Nenhuma reclamação encontrada com esse id')
    }

    return complaint
  }

  public async create(data: CreateComplaintRequest): Promise<ComplaintWithRelations> {
    const { image, text, user } = data

    validateUserRole(user.role, 'Administradores não podem registrar reclamações')
    validateComplaintCreation(text)

    await this.geminiService.checkProfanity(text, image.buffer)

    const creationData = {
      ...text,
      userId: user.id,
    }

    const imageUrl = await this.s3Service.uploadImage(image.buffer, image.name)

    return this.model.create(creationData, [imageUrl])
  }

  public async updateStatus(id: UUID, status: Status): Promise<ComplaintWithRelations> {
    validateId(id)

    const complaint = await this.model.findById(id)

    if (!complaint) {
      throw new NotFoundException('Nenhuma reclamação encontrada com esse id')
    }

    return this.model.updateStatus(id, status)
  }
}
