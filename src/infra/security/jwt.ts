import User from '../../domain/entities/user';
import { IToken } from '../../domain/services/token';
import jwt from 'jsonwebtoken';
import { publicKey, privateKey } from './keys';

export class AccessToken implements IToken {
  generateToken(payload: { userId: User['id'] }) {
    return jwt
      .sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '15m',
      })
      .toString();
  }

  verifyToken(token: string): { userId: User['id'] } {
    return jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    }) as { userId: User['id'] };
  }

  decodeToken(token: string): { userId: User['id'] } {
    return jwt.decode(token) as { userId: User['id'] };
  }
}

export class RefreshToken implements IToken {
  generateToken(payload: { userId: User['id'] }) {
    return jwt
      .sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '7d',
      })
      .toString();
  }

  verifyToken(token: string): { userId: User['id'] } {
    return jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    }) as { userId: User['id'] };
  }

  decodeToken(token: string): { userId: User['id'] } {
    return jwt.decode(token) as { userId: User['id'] };
  }
}
