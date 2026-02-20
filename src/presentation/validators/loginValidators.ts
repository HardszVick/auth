export const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        minLength: 5,
        maxLength: 100,
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 50,
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
          },
          required: ['id', 'email'],
        },
      },
      required: ['success', 'data'],
    },
  },
};
