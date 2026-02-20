import { FastifyReply, FastifyRequest } from 'fastify';
import makeLogout from '../../../main/factory/makeLogout';

export const logoutHandler = async (req: FastifyRequest, rep: FastifyReply) => {
  const refreshToken = req.cookies.refreshToken!;

  const logout = makeLogout();

  await logout.execute(refreshToken);

  return rep
    .clearCookie('refreshToken')
    .clearCookie('accessToken')
    .status(200)
    .send({ success: true, message: 'Logout successful' });
};

export default logoutHandler;
