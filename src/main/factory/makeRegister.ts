import RegisterUseCase from '../../application/useCases/register';
import UserRepo from '../../infra/repo/UserRepo';
import { HashService } from '../../infra/security/hash';

const makeRegister = () => {
  const userRepository = new UserRepo();
  const hashService = new HashService();
  return new RegisterUseCase(userRepository, hashService);
};

export default makeRegister;
