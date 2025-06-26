import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  // sut -> System under test
  let sut: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.exec({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const password = '123456'

    const { user } = await sut.exec({
      name: 'John Doe',
      email: 'john@doe.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john@doe.com'

    await sut.exec({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.exec({
        name: 'Mary Doe',
        email,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
