import { IRefreshTokenRepo } from '../../domain/repositories/IRefreshTokenRepo';

class LogoutUseCase {
  constructor(private repo: IRefreshTokenRepo) {}

  execute = async (refreshToken: string) => {
    const tokenData = await this.repo.findByToken(refreshToken);

    if (!tokenData) throw new Error('Invalid refresh token');

    await this.repo.revokeToken(refreshToken);
  };
}

export default LogoutUseCase;
