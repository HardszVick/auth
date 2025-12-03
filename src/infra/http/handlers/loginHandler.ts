import { FastifyReply, FastifyRequest } from "fastify";

export const loginHandler = async (
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  rep: FastifyReply
) => {
  const { email, password } = req.body;
};
