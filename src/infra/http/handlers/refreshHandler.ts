import { FastifyReply, FastifyRequest } from "fastify";

export const refreshHandler = async (
  req: FastifyRequest<{ Body: { login: string; password: string } }>,
  rep: FastifyReply
) => {
  const { login, password } = req.body;
};

export default refreshHandler;
