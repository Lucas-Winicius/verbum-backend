export default {
  description: 'post some data',
  tags: ['users'],
  summary: 'qwerty',
  body: {
    type: 'object',
    properties: {
      hello: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'Succesful response',
      type: 'object',
      properties: {
        hello: { type: 'string' },
      },
    },
  },
} as const