import { FastifyReply, FastifyRequest } from 'fastify';
import makeRefresh from '../../../main/factory/makeRefresh';

export const refreshHandler = async (
  req: FastifyRequest<{ Body: { refreshToken: string } }>,
  rep: FastifyReply,
) => {
  const oldRefreshToken = req.body.refreshToken;
  const refresh = makeRefresh();

  const { accessToken, refreshToken } = await refresh.execute(oldRefreshToken);
  rep.code(200).send({ success: true, data: { accessToken, refreshToken } });
};

export default refreshHandler;
