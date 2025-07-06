import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await prisma.gym.createMany({
      data: [
        {
          title: 'Backend Gym',
          description: 'A gym to test this controller',
          phone: '11988887777',
          latitude: -22.9780512,
          longitude: -47.0503237,
        },
        {
          title: 'Frontend Gym',
          description: 'A gym to test this controller',
          phone: '11988887777',
          latitude: -22.9780512,
          longitude: -47.0503237,
        },
      ],
    })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({ q: 'Backend' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      gyms: [
        expect.objectContaining({
          title: 'Backend Gym',
        }),
      ],
    })
  })
})
