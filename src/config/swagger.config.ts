import { SwaggerOptions } from '@fastify/swagger'

const config: SwaggerOptions = {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Verbum',
      description:
        'Welcome to swagger documentation, the best way to manage your library.',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [{ name: 'users', description: 'User related end-points' }],
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
}

export default config
