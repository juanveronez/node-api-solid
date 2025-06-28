import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

describe('Fetch Nearby Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FetchNearbyGymsUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      phone: null,
      description: null,
      latitude: -22.9780512,
      longitude: -47.0503237,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      phone: null,
      description: null,
      latitude: -22.8320969,
      longitude: -47.1623179,
    })

    const { gyms } = await sut.exec({
      userLatitude: -22.9780512,
      userLongitude: -47.0503237,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
