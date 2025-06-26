import { CheckIn, Prisma } from 'generated/prisma'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

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

    this.checkIns.push(checkIn)
    return checkIn
  }
}
