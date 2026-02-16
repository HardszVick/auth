import User from '../entities/user';

type TToken = string;
type TPayload = {
  userId: User['id'];
};

export interface IToken {
  generateToken(payload: TPayload): string;
  verifyToken(token: TToken): TPayload;
  decodeToken(token: TToken): TPayload;
}

interface ITokenService {
  accessToken: IToken;
  refreshToken: IToken;
}

export default ITokenService;
