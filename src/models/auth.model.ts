import { PrismaClient, User } from '@prisma/client'

export default class AuthModel {
  constructor(private readonly prisma: PrismaClient) {}

  public async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }
}
