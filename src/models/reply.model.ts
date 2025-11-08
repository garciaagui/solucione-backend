import { PrismaClient } from '@prisma/client'

export default class ReplyModel {
  constructor(private readonly prisma: PrismaClient) {}
}
