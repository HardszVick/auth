import "fastify";
import { AuthDomainService } from "../domain/user/userService";
import { JwtService } from "../infra/security/jwtService";

declare module "fastify" {
  interface FastifyRequest {
    AuthService: AuthDomainService;
    JwtService: JwtService;
  }
}
