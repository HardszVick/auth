import { FastifyPluginAsync } from "fastify";
import cookie from "@fastify/cookie";

export const cookiePlugin: FastifyPluginAsync = async (app) => {
  await app.register(cookie, {
    secret: "mykey",
  });
};
