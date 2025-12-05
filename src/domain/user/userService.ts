import { PasswordService } from "../security";
import { User } from "./userEntity";
import { UserRepository } from "./userRepo";

export class AuthDomainService {
  constructor(private repo: UserRepository, private ps: PasswordService) {}

  getUserByEmail = (email: string) => {
    return this.repo.findByEmail(email);
  };

  getUserById = (id: User["id"]) => {
    return this.repo.findById(id);
  };

  samePassword = (password: string, passwordHash: string) => {
    return this.ps.verify(passwordHash, password);
  };

  createNewUser = async (name: string, email: string, password: string) => {
    const passwordHash = await this.ps.hash(password);
    return this.repo.create({ email, passwordHash, name });
  };
}
