import { loginSchema } from '@/schemas/auth'
import { BadRequestException } from '@/utils/exceptions'

export const validateLogin = (email: string, password: string) => {
  const { error } = loginSchema.validate({ email, password })

  if (error) {
    throw new BadRequestException(error.message)
  }
}
