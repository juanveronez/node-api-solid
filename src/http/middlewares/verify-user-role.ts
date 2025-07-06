import { FastifyReply, FastifyRequest } from 'fastify'
import { Role } from 'generated/prisma'

export function verifyUserRole(roleToVerify: Role) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { role } = req.user

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
