import { createComplaintSchema } from '@/schemas/complaint'
import { CreateComplaintRequest } from '@/types/complaint'
import { BadRequestException } from '@/utils/exceptions'
import { Status } from '@prisma/client'

export const validateComplaintCreation = (data: CreateComplaintRequest['text']) => {
  const { error } = createComplaintSchema.validate(data)

  if (error) {
    throw new BadRequestException(error.message)
  }
}

export const validateComplaintStatusForUpdate = (status: Status) => {
  if (status === 'Finalizado') {
    throw new BadRequestException('Reclamação já finalizada')
  }

  if (status !== 'Aberto' && status !== 'Andamento') {
    throw new BadRequestException(
      'Apenas reclamações com status Aberto ou Andamento podem ser atualizadas',
    )
  }
}
