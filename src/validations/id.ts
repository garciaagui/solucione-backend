import { idSchema } from '@/schemas/id'
import { BadRequestException } from '@/utils/exceptions'

export const validateId = (id: string) => {
  const { error } = idSchema.validate(id)

  if (error) {
    throw new BadRequestException('Id deve ser um UUID válido')
  }
}
