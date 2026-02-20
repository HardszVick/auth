import { FastifyInstance } from 'fastify';
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
} from '../handlers/auth';
import { loginSchema } from '../validators/loginValidators';
import { registerSchema } from '../validators/registerValidator';
import { refreshSchema } from '../validators/refreshValidator';
import { logoutSchema } from '../validators/logoutValidators';
import { refreshTokenMiddleware } from '../middlewares/refreshTokenMiddleware';

const authRoute = async (app: FastifyInstance) => {
  app.post('/register', { schema: registerSchema }, registerHandler);
  app.post('/login', { schema: loginSchema }, loginHandler);
  app.post(
    '/refresh-token',
    { schema: refreshSchema, onRequest: [refreshTokenMiddleware] },
    refreshHandler,
  );
  app.post(
    '/logout',
    { schema: logoutSchema, onRequest: [refreshTokenMiddleware] },
    logoutHandler,
  );
};

export default authRoute;
