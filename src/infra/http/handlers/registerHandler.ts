import { FastifyReply, FastifyRequest } from "fastify";

export const registerHandler = async (
  req: FastifyRequest<{
    Body: { email: string; password: string; name: string };
  }>,
  rep: FastifyReply
) => {
  const { email, password, name: string } = req.body;
};
export default registerHandler;
