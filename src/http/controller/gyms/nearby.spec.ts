import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near Gym',
        phone: null,
        description: null,
        latitude: -22.9780512,
        longitude: -47.0503237,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Gym',
        phone: null,
        description: null,
        latitude: -22.8320969,
        longitude: -47.1623179,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -22.9780512,
        longitude: -47.0503237,
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      gyms: [
        expect.objectContaining({
          title: 'Near Gym',
        }),
      ],
    })
  })
})
