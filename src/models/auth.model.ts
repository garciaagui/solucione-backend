import { CreateUserData, UpdateUserData } from '@/types/auth'
import { PrismaClient, User } from '@prisma/client'

export default class AuthModel {
  constructor(private readonly prisma: PrismaClient) {}

  public async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  public async createUser(data: CreateUserData): Promise<User> {
    return this.prisma.user.create({
      data,
    })
  }

  public async updateUser(email: string, data: UpdateUserData): Promise<User> {
    return this.prisma.user.update({
      where: { email },
      data,
    })
  }
}
