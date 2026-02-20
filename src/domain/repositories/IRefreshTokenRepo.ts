import RefreshToken from '../entities/refreshToken';

export interface RefreshTokenDTO {
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface IRefreshTokenRepo {
  save(data: RefreshTokenDTO): Promise<void>;
  findByToken(token: string): Promise<RefreshToken | null>;
  revokeToken(token: string): Promise<void>;
  revokeAllUserTokens(userId: string): Promise<void>;
}
