export const pingSwaggerSchema = {
  schema: {
    summary: "Simple ping check",
    description: "Return Pong",
    tags: ["Health"],
    response: {
      200: {
        type: "object",
        properties: {
          sucess: { type: "boolean" },
          code: { type: "number" },
          message: { type: "string" },
        },
        example: {
          sucess: true,
          code: 200,
          message: "Pong",
        },
      },
    },
  },
};
