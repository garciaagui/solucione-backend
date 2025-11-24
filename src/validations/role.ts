import { UnauthorizedException } from '@/utils/exceptions'
import { Role } from '@prisma/client'

export const validateAdminRole = (role: Role, message?: string) => {
  if (role !== 'admin') {
    throw new UnauthorizedException(message || 'Apenas administradores podem fazer isso')
  }
}

export const validateUserRole = (role: Role, message?: string) => {
  if (role !== 'user') {
    throw new UnauthorizedException(message || 'Apenas usuários podem fazer isso')
  }
}
