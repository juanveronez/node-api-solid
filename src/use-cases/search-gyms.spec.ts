import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

describe('Seatch Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: SearchGymsUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Test Gym',
      phone: null,
      description: null,
      latitude: -22.9780512,
      longitude: -47.0503237,
    })
    await gymsRepository.create({
      title: 'Last Test Gym',
      phone: null,
      description: null,
      latitude: -22.9780512,
      longitude: -47.0503237,
    })

    const { gyms } = await sut.exec({
      query: 'last',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Last Test Gym',
      }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `${i} Test Gym`,
        phone: null,
        description: null,
        latitude: -22.9780512,
        longitude: -47.0503237,
      })
    }

    const { gyms } = await sut.exec({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: '21 Test Gym',
      }),
      expect.objectContaining({
        title: '22 Test Gym',
      }),
    ])
  })
})
