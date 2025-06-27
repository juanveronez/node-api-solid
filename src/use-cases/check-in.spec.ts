import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { Decimal } from 'generated/prisma/runtime/library'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in'

describe('Authenticate Use Case', () => {
  const fakeLatitude = -22.9780512
  const fakeLongitude = -47.0503237

  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInUseCase

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    vi.useFakeTimers()

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'test-gym',
      description: '',
      phone: '',
      latitude: new Decimal(fakeLatitude),
      longitude: new Decimal(fakeLongitude),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.exec({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: fakeLatitude,
      userLongitude: fakeLongitude,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8)) // 20/01/2025 08:00:00

    await sut.exec({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: fakeLatitude,
      userLongitude: fakeLongitude,
    })

    await expect(() =>
      sut.exec({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: fakeLatitude,
        userLongitude: fakeLongitude,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8)) // 20/01/2025 08:00:00

    await sut.exec({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: fakeLatitude,
      userLongitude: fakeLongitude,
    })

    vi.setSystemTime(new Date(2025, 0, 21, 8))

    const { checkIn } = await sut.exec({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: fakeLatitude,
      userLongitude: fakeLongitude,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on a distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'distant-gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.9512496),
      longitude: new Decimal(-46.9584756),
    })

    await expect(() =>
      sut.exec({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: fakeLatitude,
        userLongitude: fakeLongitude,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
