import { CheckIn, Prisma } from 'generated/prisma'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

const DEFAULT_PAGE_SIZE = 20

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return isOnSameDate && checkIn.user_id === userId
    })

    return checkInOnSameDate ?? null
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const initialResultIndex = (page - 1) * DEFAULT_PAGE_SIZE
    const finalResultIndex = page * DEFAULT_PAGE_SIZE

    return this.items
      .filter((item) => item.user_id === userId)
      .slice(initialResultIndex, finalResultIndex)
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }

  async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      gym_id,
      user_id,
      validated_at: validated_at ? new Date(validated_at) : null,
    }

    this.items.push(checkIn)
    return checkIn
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}
