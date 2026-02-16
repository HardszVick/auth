import TokenService from '../../application/services/TokenService';
import LoginUseCase from '../../application/useCases/login';
import { RefreshTokenRepo } from '../../infra/repo/RefreshTokenRepo';
import UserRepo from '../../infra/repo/UserRepo';
import { HashService } from '../../infra/security/hash';

const makeLogin = () => {
  const userRepository = new UserRepo();
  const hashService = new HashService();
  const tokenService = new TokenService();
  const refreshTokenRepo = new RefreshTokenRepo();

  return new LoginUseCase(
    userRepository,
    hashService,
    tokenService,
    refreshTokenRepo,
  );
};

export default makeLogin;
