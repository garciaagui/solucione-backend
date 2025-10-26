import ComplaintModel from '@/models/complaint.model'
import { ComplaintWithRelations, CreateComplaintRequest } from '@/types/complaint'
import { NotFoundException, UnauthorizedException } from '@/utils/exceptions'
import { validateComplaintCreation } from '@/validations/complaint'
import { validateId } from '@/validations/id'
import { UUID } from 'crypto'
import S3Service from './s3.service'

export default class ComplaintService {
  private s3Service: S3Service

  constructor(private readonly model: ComplaintModel) {
    this.s3Service = new S3Service()
  }

  public async findAll(): Promise<ComplaintWithRelations[]> {
    return this.model.findAll()
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

    if (user.role !== 'user') {
      throw new UnauthorizedException('Admin não pode registrar reclmações')
    }

    validateComplaintCreation(text)

    const creationData = {
      ...text,
      userId: user.id,
    }

    const imageUrl = await this.s3Service.uploadImage(image.buffer, image.name)

    return this.model.create(creationData, [imageUrl])
  }
}
