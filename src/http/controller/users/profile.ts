import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const userId = req.user.sub

  const { user } = await getUserProfile.exec({ userId })

  return reply.status(200).send({
    user: { ...user, password_hash: undefined },
  })
}
