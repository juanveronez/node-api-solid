import { Gym, Prisma } from 'generated/prisma'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from 'generated/prisma/runtime/library'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

const DEFAULT_PAGE_SIZE = 20

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const item = this.items.find((gym) => gym.id === id)
    return item ?? null
  }

  async searchMany(query: string, page: number) {
    const initialResultIndex = (page - 1) * DEFAULT_PAGE_SIZE
    const finalResultIndex = page * DEFAULT_PAGE_SIZE

    return this.items
      .filter((item) => item.title.toUpperCase().includes(query.toUpperCase()))
      .slice(initialResultIndex, finalResultIndex)
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(params, {
        latitude: item.latitude.toNumber(),
        longitude: item.longitude.toNumber(),
      })

      return distance < 10
    })
  }

  async create(data: Prisma.GymCreateInput) {
    const item: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(item)
    return item
  }
}
