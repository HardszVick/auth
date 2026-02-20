import { FastifyReply, FastifyRequest } from 'fastify';
import makeLogin from '../../../main/factory/makeLogin';
import UserPresenter from '../../presenters/UserPresenter';
import { env } from '../../../main/config/env';

type LoginRequestBody = {
  email: string;
  password: string;
};

export const loginHandler = async (
  req: FastifyRequest<{ Body: LoginRequestBody }>,
  rep: FastifyReply,
) => {
  const { email, password } = req.body;

  const loginUseCase = makeLogin();
  const response = await loginUseCase.execute(email, password);

  const { user, accessToken, refreshToken } = response;
  const userPresenter = new UserPresenter(user);

  const userResponse = userPresenter.toPublic();

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
    .send({
      success: true,
      data: userResponse,
    });
};
