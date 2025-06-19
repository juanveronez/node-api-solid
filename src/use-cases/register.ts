import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParams {
  email: string
  name: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private usersRepository: any) {}

  async exec({ email, name, password }: RegisterUseCaseParams) {
    const password_hash = await hash(password, 12)

    const userWithSameEmail = await prisma.user.findUnique({ where: { email } })

    if (userWithSameEmail) {
      throw new Error('e-mail already exists')
    }

    await this.usersRepository.create({ email, name, password_hash })
  }
}
