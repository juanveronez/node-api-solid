import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParams {
  email: string
  name: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async exec({ email, name, password }: RegisterUseCaseParams) {
    const password_hash = await hash(password, 12)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('e-mail already exists')
    }

    await this.usersRepository.create({ email, name, password_hash })
  }
}
