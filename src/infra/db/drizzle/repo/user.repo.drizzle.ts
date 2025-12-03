import { UserDrizzle } from "./../schemas/user";
import { User } from "../../../../domain/user/userEntity";
import { UserRepository } from "../../../../domain/user/userRepo";
import { db } from "../drizzle";
import { eq } from "drizzle-orm";

export class UserRepoDrizzle implements UserRepository {
  async findById(id: string): Promise<User | undefined> {
    return db.query.UserDrizzle.findFirst({ where: eq(UserDrizzle.id, id) });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return db.query.UserDrizzle.findFirst({
      where: eq(UserDrizzle.email, email),
    });
  }

  async create(data: User): Promise<User | undefined> {
    const result = await db
      .insert(UserDrizzle)
      .values({
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
      })
      .returning();

    return result[0];
  }
}
