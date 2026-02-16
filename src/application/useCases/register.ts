import IUserRepo from '../../domain/repositories/IUserRepo';
import IHash from '../../domain/services/hash';
import User from '../../domain/entities/user';
import { randomUUID } from 'crypto';

class RegisterUseCase {
  constructor(
    private userRepository: IUserRepo,
    private hashService: IHash,
  ) {}

  async execute(email: string, password: string) {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashService.hash(password);

    const user = User.create({
      id: randomUUID(),
      email,
      password: hashedPassword,
      role: 'USER',
    });

    return this.userRepository.createOrUpdate(user);
  }
}

export default RegisterUseCase;
