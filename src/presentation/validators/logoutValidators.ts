export const logoutSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
      required: ['success', 'message'],
    },
  },
};

export const logoutSchemaConfig = {
  isPublic: false,
  requireRefresh: true,
};
