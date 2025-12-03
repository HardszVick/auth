import { FastifyInstance } from "fastify";
import {
  loginHandler,
  pingHandler,
  refreshHandler,
  registerHandler,
} from "../handlers";
import { pingSwaggerSchema } from "../schemas/swagger";

export const apiRoutes = async (app: FastifyInstance) => {
  app.post("/login", loginHandler);
  app.post("/refresh", refreshHandler);
  app.post("/register", registerHandler);
  app.get("/ping", pingSwaggerSchema, pingHandler);
};
