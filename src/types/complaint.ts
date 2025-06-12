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
