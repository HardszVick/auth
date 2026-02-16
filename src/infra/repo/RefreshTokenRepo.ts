import { eq, and } from 'drizzle-orm';
import {
  IRefreshTokenRepo,
  RefreshTokenDTO,
} from '../../domain/repositories/IRefreshTokenRepo';
import { RefreshTokenDBSchema } from '../database/drizzle/schemas/refreshToken';
import { db } from '../database/drizzle/client';

export class RefreshTokenRepo implements IRefreshTokenRepo {
  async save(data: RefreshTokenDTO): Promise<void> {
    await db.insert(RefreshTokenDBSchema).values({
      userId: data.userId,
      token: data.token,
      expiresAt: data.expiresAt,
    });
  }

  async findByToken(token: string): Promise<any | null> {
    const [result] = await db
      .select()
      .from(RefreshTokenDBSchema)
      .where(
        and(
          eq(RefreshTokenDBSchema.token, token),
          eq(RefreshTokenDBSchema.revoked, false),
        ),
      );

    return result || null;
  }

  async revokeToken(token: string): Promise<void> {
    await db
      .update(RefreshTokenDBSchema)
      .set({
        revoked: true,
        revokedAt: new Date(),
      })
      .where(eq(RefreshTokenDBSchema.token, token));
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await db
      .update(RefreshTokenDBSchema)
      .set({
        revoked: true,
        revokedAt: new Date(),
      })
      .where(eq(RefreshTokenDBSchema.userId, userId));
  }
}
