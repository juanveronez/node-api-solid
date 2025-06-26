import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  // sut -> System under test
  let sut: AuthenticateUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 12),
    })

    const { user } = await sut.exec({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.exec({
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.instanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 12),
    })

    await expect(
      sut.exec({
        email: 'john@doe.com',
        password: '654321',
      }),
    ).rejects.instanceOf(InvalidCredentialsError)
  })
})
