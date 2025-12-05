import { FastifyInstance } from "fastify";
import {
  loginHandler,
  pingHandler,
  refreshHandler,
  registerHandler,
} from "../handlers";
import { pingSwaggerSchema } from "../schemas/swagger";
import { AuthDomainService } from "../../../domain/user/userService";
import { UserRepoDrizzle } from "../../db/drizzle/repo/user.repo.drizzle";
import { Argon2PasswordService } from "../../security/Argon2PasswordService";

export const apiRoutes = async (app: FastifyInstance) => {
  app.decorateRequest(
    "AuthService",
    new AuthDomainService(new UserRepoDrizzle(), new Argon2PasswordService())
  );

  app.post("/login", loginHandler);
  app.post("/refresh", refreshHandler);
  app.post("/register", registerHandler);
  app.get("/ping", pingSwaggerSchema, pingHandler);
};
