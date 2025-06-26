import { Prisma, User } from 'generated/prisma'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create({ email, name, password_hash }: Prisma.UserCreateInput) {
    const newUser = { email, name, password_hash, id: randomUUID() }
    this.users.push(newUser)

    return newUser
  }

  async findById(id: string) {
    const user = this.users.find((u) => u.id === id)
    return user ?? null
  }

  async findByEmail(email: string) {
    const user = this.users.find((u) => u.email === email)
    return user ?? null
  }
}
