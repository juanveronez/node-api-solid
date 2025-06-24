import { Prisma, User } from 'generated/prisma'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const newUser = { ...data, id: randomUUID() }
    this.users.push(newUser)

    return newUser
  }

  async findByEmail(email: string) {
    const user = this.users.find((u) => u.email === email)
    return user ?? null
  }
}
