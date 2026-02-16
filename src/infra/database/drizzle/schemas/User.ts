import { pgTable, uuid, varchar, boolean, pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', [
  'SUPERADMIN',
  'USER',
  'SUPPORT',
]);

export const UserDBSchema = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  disabled: boolean('disabled').default(false).notNull(),
  role: userRoleEnum('role').default('USER').notNull(),
});
