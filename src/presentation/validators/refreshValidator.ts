export const refreshSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
      required: ['success'],
    },
  },
};

export const refreshSchemaConfig = {
  isPublic: false,
  requireRefresh: true,
};
