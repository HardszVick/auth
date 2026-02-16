import { FastifyInstance } from 'fastify';
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
} from '../handlers/auth';

const authRoute = async (app: FastifyInstance) => {
  app.post('/register', registerHandler);
  app.post('/login', loginHandler);
  app.post('/refresh-token', refreshHandler);
  app.post('/logout', logoutHandler);
};

export default authRoute;
