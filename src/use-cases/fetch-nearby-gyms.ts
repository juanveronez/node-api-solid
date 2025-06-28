import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from 'generated/prisma'

interface FetchNearbyGymsUseCaseParams {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async exec({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseParams): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
