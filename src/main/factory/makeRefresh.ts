import TokenService from '../../application/services/TokenService';
import RefreshTokenUseCase from '../../application/useCases/refresh';
import { RefreshTokenRepo } from '../../infra/repo/RefreshTokenRepo';
import UserRepo from '../../infra/repo/UserRepo';

const makeRefresh = () => {
  const userRepository = new UserRepo();
  const tokenService = new TokenService();
  const refreshRepo = new RefreshTokenRepo();

  return new RefreshTokenUseCase(userRepository, tokenService, refreshRepo);
};

export default makeRefresh;
