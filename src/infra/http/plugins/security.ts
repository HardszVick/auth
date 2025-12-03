import { FastifyPluginAsync } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";

export const securityPlugin: FastifyPluginAsync = async (app) => {
  await app.register(helmet);

  await app.register(cors, {
    origin: true,
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });
};
