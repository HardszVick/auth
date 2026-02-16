import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { UserDBSchema } from './User';

export const RefreshTokenDBSchema = pgTable('refresh_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull()
    .references(() => UserDBSchema.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 512 }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  revoked: boolean('revoked').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
});
