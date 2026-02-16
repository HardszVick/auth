import ITokenService from '../../domain/services/token';
import { AccessToken, RefreshToken } from '../../infra/security/jwt';

class TokenService implements ITokenService {
  accessToken = new AccessToken();
  refreshToken = new RefreshToken();
}

export default TokenService;
