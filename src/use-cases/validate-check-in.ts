import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from 'generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckInUseCaseParams {
  checkInId: string
}
interface ValidateCheckInUseCaseResult {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async exec({
    checkInId,
  }: ValidateCheckInUseCaseParams): Promise<ValidateCheckInUseCaseResult> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()
    this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
