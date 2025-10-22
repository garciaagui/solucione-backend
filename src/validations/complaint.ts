import { createComplaintSchema } from '@/schemas/complaint'
import { CreateComplaintData } from '@/types/complaint'
import { BadRequestException } from '@/utils/exceptions'

export const validateComplaintCreation = (data: CreateComplaintData) => {
  const { error } = createComplaintSchema.validate(data)

  if (error) {
    throw new BadRequestException(error.message)
  }
}
