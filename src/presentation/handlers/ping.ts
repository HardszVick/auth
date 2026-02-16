import { FastifyReply, FastifyRequest } from 'fastify';

class PingController {
  ping = async (req: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send('pong');
  };
}
export default PingController;
