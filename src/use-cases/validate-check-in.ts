import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from 'generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'm',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()
    this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
