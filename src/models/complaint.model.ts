import { ComplaintWithRelations } from '@/types/complaint'
import { PrismaClient } from '@prisma/client'
import { UUID } from 'crypto'

const DEFAULT_INCLUDE = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  replies: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  },
}

export default class ComplaintModel {
  constructor(private readonly prisma: PrismaClient) {}

  public async findAll(): Promise<ComplaintWithRelations[]> {
    return this.prisma.complaint.findMany({
      include: DEFAULT_INCLUDE,
    })
  }

  public async findById(id: UUID): Promise<ComplaintWithRelations | null> {
    return this.prisma.complaint.findUnique({
      where: { id },
      include: DEFAULT_INCLUDE,
    })
  }
}
