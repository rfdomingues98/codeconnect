import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  time,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const Post = pgTable("post", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: varchar("name", { length: 256 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const User = pgTable("user", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }),
  image: varchar("image", { length: 255 }),
});

export const UserRelations = relations(User, ({ many }) => ({
  accounts: many(Account),
  challenges: many(Challenges),
}));

export const Account = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<"email" | "oauth" | "oidc" | "webauthn">()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, { fields: [Account.userId], references: [User.id] }),
}));

export const Session = pgTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  expires: timestamp("expires", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));

export const DifficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const Challenges = pgTable("challenges", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  initialCode: text("initialCode").notNull(),
  authorId: uuid("authorId").references(() => User.id, {
    onDelete: "set null",
  }),
  duration: time("duration"),
  difficulty: DifficultyEnum("difficulty").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});

export const ChallengeRelations = relations(Challenges, ({ one, many }) => ({
  author: one(User, { fields: [Challenges.authorId], references: [User.id] }),
  outputTests: many(OutputTests),
}));

export const OutputTests = pgTable("output_tests", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  code: text("code").notNull(),
  expectedOutput: text("expectedOutput").notNull(),
  challengeId: uuid("challengeId")
    .notNull()
    .references(() => Challenges.id),
});

export const OutputTestsRelations = relations(OutputTests, ({ one }) => ({
  challenge: one(Challenges, {
    fields: [OutputTests.challengeId],
    references: [Challenges.id],
  }),
}));

export const PerformanceTests = pgTable("performance_tests", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  code: text("code").notNull(),
  executionTime: text("executionTime").notNull(),
  challengeId: uuid("challengeId")
    .notNull()
    .references(() => Challenges.id),
});

export const PerformanceTestsRelations = relations(
  PerformanceTests,
  ({ one }) => ({
    challenge: one(Challenges, {
      fields: [PerformanceTests.challengeId],
      references: [Challenges.id],
    }),
  }),
);

// export const ChallengeSubmissions = pgTable("challenge_submissions", {});
