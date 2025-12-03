import { User } from "./userEntity";

export interface UserRepository {
  findByEmail(email: User["email"]): Promise<User | undefined>;
  findById(id: User["id"]): Promise<User | undefined>;
  create(data: {
    email: User["email"];
    passwordHash: User["passwordHash"];
    name: User["name"];
  }): Promise<User | undefined>;
}
