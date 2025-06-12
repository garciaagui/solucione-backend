import ComplaintModel from '@/models/complaint.model'
import { ComplaintWithRelations } from '@/types/complaint'
import { NotFoundException } from '@/utils/exceptions'
import { validateId } from '@/validations/id'
import { UUID } from 'crypto'

export default class ComplaintService {
  constructor(private readonly model: ComplaintModel) {}

  public async findById(id: UUID): Promise<ComplaintWithRelations> {
    validateId(id)

    const complaint = await this.model.findById(id)

    if (!complaint) {
      throw new NotFoundException('Nenhuma reclamação encontrada com esse id')
    }

    return complaint
  }
}
