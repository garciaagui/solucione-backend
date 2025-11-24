import { ComplaintWithRelations, CreateComplaintData } from '@/types/complaint'
import { PrismaClient, Status } from '@prisma/client'
import { UUID } from 'crypto'

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
  replies: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
        },
      },
    },
  },
}

export default class ComplaintModel {
  constructor(private readonly prisma: PrismaClient) {}

  public async findAll(sort: 'asc' | 'desc' = 'desc'): Promise<ComplaintWithRelations[]> {
    return this.prisma.complaint.findMany({
      include: DEFAULT_INCLUDE,
      orderBy: {
        createdAt: sort,
      },
    })
  }

  public async findById(id: UUID): Promise<ComplaintWithRelations | null> {
    return this.prisma.complaint.findUnique({
      where: { id },
      include: DEFAULT_INCLUDE,
    })
  }

  public async findByUserId(userId: UUID): Promise<ComplaintWithRelations[]> {
    return this.prisma.complaint.findMany({
      where: { userId },
      include: DEFAULT_INCLUDE,
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  public async findRepliedByUserId(userId: UUID): Promise<ComplaintWithRelations[]> {
    return this.prisma.complaint.findMany({
      where: {
        replies: {
          some: {
            userId,
          },
        },
      },
      include: DEFAULT_INCLUDE,
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  public async create(
    data: CreateComplaintData,
    images: string[],
  ): Promise<ComplaintWithRelations> {
    return this.prisma.complaint.create({
      data: {
        ...data,
        images,
      },
      include: DEFAULT_INCLUDE,
    })
  }

  public async updateStatus(id: UUID, newStatus: Status): Promise<ComplaintWithRelations> {
    return this.prisma.complaint.update({
      where: { id },
      data: { status: newStatus },
      include: DEFAULT_INCLUDE,
    })
  }
}
