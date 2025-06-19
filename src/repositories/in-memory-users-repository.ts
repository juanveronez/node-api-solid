import { Prisma } from 'generated/prisma'

export class InMemoryUsersRepository {
  public users: unknown[] = []

  async create(data: Prisma.UserCreateInput) {
    this.users.push(data)

    return data
  }
}
