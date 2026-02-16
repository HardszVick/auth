import { eq, InferSelectModel } from 'drizzle-orm';
import User from '../../domain/entities/user';
import IUserRepo from '../../domain/repositories/IUserRepo';
import { db } from '../database/drizzle/client';
import { UserDBSchema } from '../database/drizzle/schemas';

type UserRow = InferSelectModel<typeof UserDBSchema>;

class UserRepo implements IUserRepo {
  findByEmail = async (email: string) => {
    const [row] = await db
      .select()
      .from(UserDBSchema)
      .where(eq(UserDBSchema.email, email));

    if (!row) return null;

    return this.toDomain(row);
  };

  findById = async (id: User['id']) => {
    const [row] = await db
      .select()
      .from(UserDBSchema)
      .where(eq(UserDBSchema.id, id));

    if (!row) return null;

    return this.toDomain(row);
  };

  createOrUpdate = async (user: User) => {
    const [row] = await db
      .insert(UserDBSchema)
      .values({
        id: user.id,
        email: user.email,
        password: user.password,
        disabled: user.disabled,
        role: user.role,
      })
      .onConflictDoUpdate({
        target: UserDBSchema.id,
        set: {
          email: user.email,
          password: user.password,
          disabled: user.disabled,
          role: user.role,
        },
      })
      .returning();

    if (!row) {
      throw new Error('Failed to insert or update user');
    }

    return this.toDomain(row);
  };

  private toDomain(row: UserRow): User {
    return User.create({
      id: row.id,
      email: row.email,
      password: row.password,
      role: row.role,
      disabled: row.disabled,
    });
  }
}

export default UserRepo;
