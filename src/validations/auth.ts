import { loginSchema, registerSchema } from '@/schemas/auth'
import { BadRequestException } from '@/utils/exceptions'

export const validateLogin = (email: string, password: string) => {
  const { error } = loginSchema.validate({ email, password })

  if (error) {
    throw new BadRequestException(error.message)
  }
}

export const validateRegister = (name: string, email: string, password: string) => {
  const { error } = registerSchema.validate({ name, email, password })

  if (error) {
    throw new BadRequestException(error.message)
  }
}
