import { Prisma, CheckIn } from 'generated/prisma'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return prisma.checkIn.create({ data })
  }

  async findById(id: string) {
    return prisma.checkIn.findUnique({ where: { id } })
  }

  async findManyByUserId(userId: string, page: number) {
    return prisma.checkIn.findMany({
      where: { user_id: userId },
      skip: (page - 1) * 20,
      take: 20,
    })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date').toDate()
    const endOfTheDay = dayjs(date).endOf('date').toDate()

    return prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
    })
  }

  async countByUserId(userId: string) {
    return prisma.checkIn.count({ where: { user_id: userId } })
  }

  async save({ id, ...data }: CheckIn) {
    return prisma.checkIn.update({ data, where: { id } })
  }
}
