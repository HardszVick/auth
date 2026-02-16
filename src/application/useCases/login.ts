import { IRefreshTokenRepo } from '../../domain/repositories/IRefreshTokenRepo';
import IUserRepo from '../../domain/repositories/IUserRepo';
import IHash from '../../domain/services/hash';
import ITokenService from '../../domain/services/token';

class LoginUseCase {
  constructor(
    private userRepository: IUserRepo,
    private hashService: IHash,
    private tokenService: ITokenService,
    private refreshTokenRepo: IRefreshTokenRepo,
  ) {}

  execute = async (email: string, password: string) => {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error('User not found');

    const isPasswordValid = await this.hashService.verify(
      user.password,
      password,
    );

    if (!isPasswordValid) throw new Error('Invalid password');

    const accessToken = this.tokenService.accessToken.generateToken({
      userId: user.id,
    });
    const refreshToken = this.tokenService.refreshToken.generateToken({
      userId: user.id,
    });

    await this.refreshTokenRepo.save({
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken, user };
  };
}

export default LoginUseCase;
