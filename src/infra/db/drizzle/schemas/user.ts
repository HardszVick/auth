import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const UserDrizzle = pgTable("mydb_user", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
