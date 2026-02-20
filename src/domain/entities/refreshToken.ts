export interface RefreshToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  revoked: boolean;
  createdAt: Date;
  revokedAt: Date | null;
}

export default RefreshToken;
