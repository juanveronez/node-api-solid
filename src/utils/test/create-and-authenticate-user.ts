import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john@doe.com',
    password: '123456',
  })

  if (isAdmin) {
    await prisma.user.updateMany({ data: { role: 'ADMIN' } })
  }

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john@doe.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
