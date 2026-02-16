import LogoutUseCase from '../../application/useCases/logout';
import { RefreshTokenRepo } from '../../infra/repo/RefreshTokenRepo';

const makeLogout = () => {
  const refreshTokenRepo = new RefreshTokenRepo();
  return new LogoutUseCase(refreshTokenRepo);
};

export default makeLogout;
