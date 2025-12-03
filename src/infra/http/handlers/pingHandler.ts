import { FastifyReply, FastifyRequest } from "fastify";

export const pingHandler = async (req: FastifyRequest, rep: FastifyReply) => {
  const message = "Pong";
  return rep.code(200).send({ sucess: true, code: 200, message });
};

