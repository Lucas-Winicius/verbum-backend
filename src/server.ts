import fastify from 'fastify'
import 'dotenv/config'
import routes from './routes'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

const port = parseInt(process.env.PORT || '3000')

export const app = fastify()

app.register(routes)
app.register(cors, {})
app.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Verbum',
      description: 'Welcome to swagger documentation, the best way to manage your library.',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
  },
})

app.register(swaggerUi, {
  routePrefix: '/docs', // Caminho onde a documentação estará disponível
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject
  },
  transformSpecificationClone: true,
})

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`server listening on`, address)
})
