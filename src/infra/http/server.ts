import { env } from '../../main/config/env';
import authRoute from '../../presentation/routes/auth';
import PingRoute from '../../presentation/routes/ping';
import { app, registerPlugins } from './fastify';

export async function startServer() {
  await registerPlugins();

  await app.register(authRoute);
  await app.register(PingRoute);

  await app.listen({ port: env.PORT });
}
