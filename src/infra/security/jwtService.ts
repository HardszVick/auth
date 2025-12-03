// src/infra/security/jwt/JwtService.ts
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  sub: string; 
  role?: string;
}

export class JwtService {
  private privateKey: Buffer;
  private publicKey: Buffer;

  constructor() {
    this.privateKey = fs.readFileSync(
      path.join(__dirname, "private.pem")
    );

    this.publicKey = fs.readFileSync(
      path.join(__dirname, "public.pem")
    );
  }

  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: "RS256",
      expiresIn: "15m",
    });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: "RS256",
      expiresIn: "7d",
    });
  }

  verifyToken<T = JwtPayload>(token: string): T {
    return jwt.verify(token, this.publicKey, {
      algorithms: ["RS256"],
    }) as T;
  }
}
