import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  varchar,
  index,
  uuid,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";
import { generateId } from "./utils";
import { relations, sql } from "drizzle-orm";

export const Topics = pgEnum("topics", [
  "Technology",
  "Gaming",
  "Movies",
  "Books",
  "Music",
  "Sports",
  "Food & Cooking",
  "Travel",
  "Fitness & Health",
  "Photography",
  "Art & Design",
  "Science",
  "Finance & Investment",
  "Career & Education",
  "DIY & Crafts",
  "Pets & Animals",
  "Fashion",
  "Parenting",
  "Gardening",
  "Mental Health",
  "Humor",
  "Anime & Manga",
  "Crypto & Blockchain",
  "Home Improvement",
]);

export const UsersTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  points: integer("points").default(0).notNull(),
  likesThread: jsonb("likes_thread")
    .array()
    .default(sql`ARRAY[]::jsonb[]`)
    .$type<Array<string>>(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const ThreadsTable = pgTable(
  "threads",
  {
    id: generateId,
    title: varchar("title", { length: 255 }).default("").notNull(),
    content: text("content").default("").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    userId: text("user_id")
      .references(() => UsersTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    likes: integer("likes").default(0).notNull(),
    topic: Topics("topics").default("Technology").notNull(),
  },
  (table) => {
    return {
      idIndex: index("idThreadIndex").on(table.id),
      likeIndex: index("likeThreadIndex").on(table.likes),
      userIdIndex: index("userIdThreadIndex").on(table.userId),
      titleIndex: index("titleThreadIndex").on(table.title),
    };
  }
);

export const CommentsTable = pgTable(
  "comments",
  {
    id: generateId,
    content: text("content").default("").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    userId: text("user_id")
      .references(() => UsersTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    threadId: uuid("thread_id")
      .references(() => ThreadsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => ({
    userIdIndex: index("userIdCommentIndex").on(table.userId),
    threadIdIndex: index("threadIdCommentIndex").on(table.threadId),
  })
);

// relations
export const userRelations = relations(UsersTable, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  threads: many(ThreadsTable),
  comments: many(CommentsTable),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(UsersTable, {
    fields: [session.userId],
    references: [UsersTable.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(UsersTable, {
    fields: [account.userId],
    references: [UsersTable.id],
  }),
}));

export const threadsRelations = relations(ThreadsTable, ({ one, many }) => ({
  user: one(UsersTable, {
    fields: [ThreadsTable.userId],
    references: [UsersTable.id],
  }),
  comments: many(CommentsTable),
}));

export const commentsRelations = relations(CommentsTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [CommentsTable.userId],
    references: [UsersTable.id],
  }),
  thread: one(ThreadsTable, {
    fields: [CommentsTable.threadId],
    references: [ThreadsTable.id],
  }),
}));

// types

export type TThread = typeof ThreadsTable.$inferSelect;
export type TUser = typeof UsersTable.$inferSelect;
export type TComment = typeof CommentsTable.$inferSelect;
