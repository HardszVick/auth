import { FastifyReply, FastifyRequest } from 'fastify';

export const refreshTokenMiddleware = async (
  req: FastifyRequest,
  rep: FastifyReply,
) => {
  const requireRefresh = req.cookies.refreshToken;

  if (!requireRefresh) return;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return rep.code(401).send({
      success: false,
      message: 'refresh token is required',
    });
  }
};
