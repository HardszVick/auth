import User from '../entities/user';

interface IUserRepo {
  findByEmail(email: string): Promise<User | null>;
  findById(id: User['id']): Promise<User | null>;
  createOrUpdate(User: User): Promise<User>;
}

export default IUserRepo;
