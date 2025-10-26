import { Complaint, Reply } from '@prisma/client'
import { UserBasicInfo } from './user'

export type ComplaintWithRelations = Complaint & {
  user: UserBasicInfo
  replies: Array<
    Reply & {
      user: UserBasicInfo
    }
  >
}

export interface CreateComplaintRequest {
  image: {
    buffer: Buffer
    name: string
  }
  text: {
    title: string
    description: string
    street: string
    neighborhood: string
    zipCode: string
    addressReference?: string
  }
  user: UserBasicInfo
}

export interface CreateComplaintData {
  title: string
  description: string
  street: string
  neighborhood: string
  zipCode: string
  addressReference?: string
  userId: string
}
