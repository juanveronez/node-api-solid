import { Gym } from 'generated/prisma'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const item = this.items.find((gym) => gym.id === id)
    return item ?? null
  }
}
