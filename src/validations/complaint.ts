import { createComplaintSchema } from '@/schemas/complaint'
import { CreateComplaintRequest } from '@/types/complaint'
import { BadRequestException } from '@/utils/exceptions'

export const validateComplaintCreation = (data: CreateComplaintRequest['text']) => {
  const { error } = createComplaintSchema.validate(data)

  if (error) {
    throw new BadRequestException(error.message)
  }
}
