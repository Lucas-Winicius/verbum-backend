import { FastifyReply, FastifyInstance, FastifyRequest } from 'fastify'
import postSchema from './post.schema'

export default async function get(app: FastifyInstance) {
  app.post(
    '/users',
    {
      schema: postSchema,
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      reply.send({ hello: `Hello ${req.body.hello}` })
    }
  )
}
