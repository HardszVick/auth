import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { UserDrizzle } from "./user";

export const RefreshTokensDrizzle = pgTable("mydb_refresh_tokens", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserDrizzle.id, { onDelete: "cascade" }),
  token: text("token").notNull(),
  ip: text("ip"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  revoked: boolean("revoked").default(false).notNull(),
});
