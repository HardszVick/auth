import User from '../entities/user';

interface IAuthService {
  register(email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<string>;
}

export default IAuthService;
