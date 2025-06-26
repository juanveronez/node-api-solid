import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Get User Profile Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 12),
    })

    const { user } = await sut.exec({ userId })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@doe.com',
      }),
    )
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      sut.exec({
        userId: 'non-existing-user-id',
      }),
    ).rejects.instanceOf(ResourceNotFoundError)
  })
})
