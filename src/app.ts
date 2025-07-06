import fastify from 'fastify'
import { usersRoutes } from './http/controller/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRoutes } from './http/controller/gyms/routes'
import { checkInsRoutes } from './http/controller/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issue: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO: Here should be used an external log tool like Sentry/DataDog
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
