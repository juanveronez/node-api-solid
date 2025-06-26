import { prisma } from '@/lib/prisma'
import { Prisma } from 'generated/prisma'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data })
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  }
}
