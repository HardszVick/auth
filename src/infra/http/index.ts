import fastify, { FastifyInstance } from "fastify";
import { apiPlugins } from "./plugins";
import { apiRoutes } from "./routes";

const server = fastify({ logger: false });

class AppServer {
  constructor(private app: FastifyInstance) {}

  start = (host: string, port: number) => {
    this.app.listen({ host, port });
  };

  config = async () => {
    await this.app.register(apiPlugins);
    await this.app.register(apiRoutes);
  };

  close = () => {
    this.app.close();
  };
}

const app = new AppServer(server);
export default app;
