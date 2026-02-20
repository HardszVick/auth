import { FastifyReply, FastifyRequest } from 'fastify';
import makeRefresh from '../../../main/factory/makeRefresh';
import { env } from '../../../main/config/env';

export const refreshHandler = async (
  req: FastifyRequest,
  rep: FastifyReply,
) => {
  const oldRefreshToken = req.cookies.refreshToken!;
  const refresh = makeRefresh();

  const { accessToken, refreshToken } = await refresh.execute(oldRefreshToken);
  rep
    .setCookie('accessToken', accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 15,
    })
    .setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    .code(200)
    .send({ success: true });
};

export default refreshHandler;
