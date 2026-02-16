export interface RefreshTokenDTO {
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface IRefreshTokenRepo {
  save(data: RefreshTokenDTO): Promise<void>;
  findByToken(token: string): Promise<any | null>;
  revokeToken(token: string): Promise<void>;
  revokeAllUserTokens(userId: string): Promise<void>;
}
