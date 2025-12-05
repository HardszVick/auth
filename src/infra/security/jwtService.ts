import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { User } from "../../domain/user/userEntity";
import RefreshRepoDrizzle from "../db/drizzle/repo/refresh.repo.drizzle";

export interface JwtPayload {
  id: User["id"];
}

export class JwtService {
  private privateKey: Buffer;
  private publicKey: Buffer;

  constructor(private repo: RefreshRepoDrizzle) {
    this.privateKey = fs.readFileSync(path.join(__dirname, "private.pem"));

    this.publicKey = fs.readFileSync(path.join(__dirname, "public.pem"));
  }

  generateAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, this.privateKey, {
      algorithm: "RS256",
      expiresIn: "15m",
    });
  };
  decodeToken = (token: string): JwtPayload | null => {
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded === "string") {
      return null;
    }

    return decoded as JwtPayload;
  };

  revokeRefreshTokenByToken = (token: string) => {
    return this.repo.revokeByToken(token);
  };

  generateRefreshToken = async (
    payload: JwtPayload,
    ip: string,
    userAgent?: string
  ): Promise<string> => {
    const token = jwt.sign(payload, this.privateKey, {
      algorithm: "RS256",
      expiresIn: "7d",
    });

    await this.repo.create({
      token,
      userId: payload.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ip,
      userAgent,
    });
    return token;
  };

  getAcessTokenByToken = (token: string) => {
    return this.repo.getByToken(token);
  };

  verifyToken = <T = JwtPayload>(token: string): T => {
    return jwt.verify(token, this.publicKey, {
      algorithms: ["RS256"],
    }) as T;
  };

  verifyRefreshToken = <T = JwtPayload>(token: string): T => {
    return jwt.verify(token, this.privateKey, {
      algorithms: ["RS256"],
    }) as T;
  };
}
