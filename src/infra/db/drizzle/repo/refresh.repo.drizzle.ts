import { eq } from "drizzle-orm";
import { db } from "../drizzle";
import { RefreshTokensDrizzle } from "../schemas";
export type RefreshRepoCreate = {
  expiresAt: Date;
  token: string;
  userId: string;
  ip?: string;
  userAgent?: string;
};
export default class RefreshRepoDrizzle {
  constructor() {}

  getByToken = async (token: string) => {
    return db.query.RefreshTokensDrizzle.findFirst({
      where: eq(RefreshTokensDrizzle.token, token),
    });
  };

  create = async (data: RefreshRepoCreate) => {
    return db.insert(RefreshTokensDrizzle).values(data).returning();
  };

  revokeByToken = async (token: string) => {
    return db
      .update(RefreshTokensDrizzle)
      .set({ revoked: true })
      .where(eq(RefreshTokensDrizzle.token, token));
  };
}
