export interface PasswordService {
  hash(password: string): Promise<string>;
  verify(hash: string, plain: string): Promise<boolean>;
}

export interface JwtService {
  signAccessToken(payload: object): string;
  signRefreshToken(payload: object): string;
  verifyAccessToken(token: string): object | null;
  verifyRefreshToken(token: string): object | null;
}