import { Reply, Status } from '@prisma/client'
import { UUID } from 'crypto'
import { UserBasicInfo } from './user'

export type ReplyWithRelations = Reply & {
  user: UserBasicInfo
}

export interface CreateReplyRequest {
  image?: {
    buffer: Buffer
    name: string
  }
  text: {
    description: string
    complaintId: UUID
  }
  user: UserBasicInfo
}

export interface CreateReplyData {
  description: string
  userId: UUID
  complaintId: UUID
  complaintStatus: Status
}
