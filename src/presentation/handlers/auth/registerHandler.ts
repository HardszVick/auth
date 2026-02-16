import { FastifyReply, FastifyRequest } from 'fastify';
import makeRegister from '../../../main/factory/makeRegister';
import UserPresenter from '../../presenters/UserPresenter';

type RegisterRequestBody = {
  email: string;
  password: string;
};

export const registerHandler = async (
  req: FastifyRequest<{ Body: RegisterRequestBody }>,
  rep: FastifyReply,
) => {
  const { email, password } = req.body;
  const register = makeRegister();

  const user = await register.execute(email, password);
  const userPresenter = new UserPresenter(user);

  rep.code(201).send({ success: true, data: userPresenter.toPublic() });
};

export default registerHandler;
