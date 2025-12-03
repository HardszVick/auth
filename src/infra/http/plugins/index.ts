import { securityPlugin } from "./security";
import { FastifyInstance } from "fastify";
import { cookiePlugin } from "./cookie";
import { swaggerPlugin } from "./swagger";

export const apiPlugins = async (app: FastifyInstance) => {
  await app.register(swaggerPlugin);
  await app.register(cookiePlugin);
  await app.register(securityPlugin);
};
