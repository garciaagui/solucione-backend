import { User } from '@prisma/client'

export type UserBasicInfo = Pick<User, 'id' | 'name' | 'email' | 'role' | 'avatar'>
