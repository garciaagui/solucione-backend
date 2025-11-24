import { CreateReplyData, ReplyWithRelations } from '@/types/reply'
import { PrismaClient } from '@prisma/client'

const DEFAULT_INCLUDE = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
    },
  },
}

export default class ReplyModel {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(data: CreateReplyData, images: string[]): Promise<ReplyWithRelations> {
    return this.prisma.reply.create({
      data: {
        ...data,
        images,
      },
      include: DEFAULT_INCLUDE,
    })
  }
}
