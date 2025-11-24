import { createReplySchema } from '@/schemas/reply'
import { CreateReplyRequest } from '@/types/reply'
import { BadRequestException } from '@/utils/exceptions'

export const validateReplyCreation = (data: CreateReplyRequest['text']) => {
  const { error } = createReplySchema.validate(data)

  if (error) {
    throw new BadRequestException(error.message)
  }
}
