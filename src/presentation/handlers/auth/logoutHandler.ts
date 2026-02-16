import { FastifyReply, FastifyRequest } from 'fastify';
import makeLogout from '../../../main/factory/makeLogout';

export const logoutHandler = async (
  req: FastifyRequest<{ Body: { refreshToken: string } }>,
  rep: FastifyReply,
) => {
  const { refreshToken } = req.body;

  const logout = makeLogout();

  await logout.execute(refreshToken);

  rep.status(200).send({ success: true, message: 'Logout successful' });
};

export default logoutHandler;
