import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyQuerySchema.parse(request.query)

  const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInHistoryUseCase()
  const { checkIns } = await fetchUserCheckInHistoryUseCase.exec({
    userId: request.user.sub,
    page,
  })

  return reply.send({ checkIns })
}
