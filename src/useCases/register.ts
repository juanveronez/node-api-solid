import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParams {
  email: string
  name: string
  password: string
}

export async function registerUseCase({
  email,
  name,
  password,
}: RegisterUseCaseParams) {
  const password_hash = await hash(password, 12)

  const userWithSameEmail = await prisma.user.findUnique({ where: { email } })

  if (userWithSameEmail) {
    throw new Error('e-mail already exists')
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash,
    },
  })
}
