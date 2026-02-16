import { IRefreshTokenRepo } from '../../domain/repositories/IRefreshTokenRepo';
import IUserRepo from '../../domain/repositories/IUserRepo';
import ITokenService from '../../domain/services/token';

class RefreshTokenUseCase {
  constructor(
    private userRepository: IUserRepo,
    private tokenService: ITokenService,
    private refreshRepo: IRefreshTokenRepo,
  ) {}

  execute = async (token: string) => {
    const payload = this.tokenService.refreshToken.verifyToken(token);

    if (!payload) throw new Error('Invalid or expired refresh token');

    const user = await this.userRepository.findById(payload.userId);

    if (!user) throw new Error('User not found');

    const tokenData = await this.refreshRepo.findByToken(token);

    if (!tokenData || tokenData.revoked)
      throw new Error('Invalid or expired refresh token');

    await this.refreshRepo.revokeToken(token);

    const accessToken = this.tokenService.accessToken.generateToken({
      userId: user.id,
    });
    const refreshToken = this.tokenService.refreshToken.generateToken({
      userId: user.id,
    });

    return { accessToken, refreshToken };
  };
}

export default RefreshTokenUseCase;
