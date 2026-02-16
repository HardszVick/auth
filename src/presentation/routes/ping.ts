import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const PingRoute = async (app: FastifyInstance) => {
  app.get('/ping', (req: FastifyRequest, rep: FastifyReply) => {
    rep.code(200).send({ success: true, message: 'pong' });
  });
};

export default PingRoute;
