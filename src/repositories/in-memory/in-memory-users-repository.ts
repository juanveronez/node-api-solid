import { Prisma, User } from 'generated/prisma'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

const users: User[] = []

export class InMemoryUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const newUser = { ...data, id: randomUUID() }
    users.push(newUser)

    return newUser
  }

  async findByEmail(email: string) {
    console.log(users)

    const user = users.find((u) => u.email === email)
    return user ?? null
  }
}
