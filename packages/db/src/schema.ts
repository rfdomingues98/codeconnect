import { relations, sql } from "drizzle-orm";
import {
  boolean,
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

/* 
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
}); */

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
  ratings: many(ChallengeRatings),
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
  performanceTests: many(PerformanceTests),
  tags: many(ChallengeTags),
  submissions: many(ChallengeSubmissions),
  ratings: many(ChallengeRatings),
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

export const SubmissionStatusEnum = pgEnum("submission_status", ["passed", "failed", "error", "timeout"]);
export const ChallengeSubmissions = pgTable("challenge_submissions", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  challengeId: uuid("challengeId")
    .notNull()
    .references(() => Challenges.id, { onDelete: "cascade" }),
  code: text("code").notNull(),
  status: SubmissionStatusEnum("status").notNull(),
  executionTime: integer("executionTime"), // in milliseconds
  memory: integer("memory"), // in KB
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ChallengeSubmissionsRelations = relations(ChallengeSubmissions, ({ one }) => ({
  user: one(User, { fields: [ChallengeSubmissions.userId], references: [User.id] }),
  challenge: one(Challenges, { fields: [ChallengeSubmissions.challengeId], references: [Challenges.id] }),
}));

export const Tags = pgTable("tags", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
});

export const ChallengeTags = pgTable("challenge_tags", {
  challengeId: uuid("challengeId")
    .notNull()
    .references(() => Challenges.id, { onDelete: "cascade" }),
  tagId: uuid("tagId")
    .notNull()
    .references(() => Tags.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({ columns: [table.challengeId, table.tagId] }),
}));

export const ChallengeTagsRelations = relations(ChallengeTags, ({ one }) => ({
  challenge: one(Challenges, { fields: [ChallengeTags.challengeId], references: [Challenges.id] }),
  tag: one(Tags, { fields: [ChallengeTags.tagId], references: [Tags.id] }),
}));

export const ProgressStatusEnum = pgEnum("progress_status", ["completed", "attempted", "bookmarked"]);

export const UserProgress = pgTable("user_progress", {
  id: uuid("id").notNull().unique().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  challengeId: uuid("challengeId")
    .notNull()
    .references(() => Challenges.id, { onDelete: "cascade" }),
  status: ProgressStatusEnum("status").notNull(),
  bestSubmissionId: uuid("bestSubmissionId").references(() => ChallengeSubmissions.id),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
}, (table) => ({
  uniqueUserChallenge: primaryKey({ columns: [table.userId, table.challengeId] }),
}));

export const UserProgressRelations = relations(UserProgress, ({ one }) => ({
  user: one(User, { fields: [UserProgress.userId], references: [User.id] }),
  challenge: one(Challenges, { fields: [UserProgress.challengeId], references: [Challenges.id] }),
  bestSubmission: one(ChallengeSubmissions, { fields: [UserProgress.bestSubmissionId], references: [ChallengeSubmissions.id] }),
}));

export const TestTypeEnum = pgEnum("test_type", ["output", "performance"]);

export const TestResults = pgTable("test_results", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  submissionId: uuid("submissionId")
    .notNull()
    .references(() => ChallengeSubmissions.id, { onDelete: "cascade" }),
  testId: uuid("testId").notNull(), // Generic reference to either output or performance test
  testType: TestTypeEnum("testType").notNull(),
  passed: boolean("passed").notNull(),
  actualOutput: text("actualOutput"),
  actualTime: integer("actualTime"), // For performance tests
  errorMessage: text("errorMessage"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const TestResultsRelations = relations(TestResults, ({ one }) => ({
  submission: one(ChallengeSubmissions, { fields: [TestResults.submissionId], references: [ChallengeSubmissions.id] }),
}));

export const ChallengeRatings = pgTable("challenge_ratings", {
  id: uuid("id").notNull().unique().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  challengeId: uuid("challengeId")
    .notNull()
    .references(() => Challenges.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
}, (table) => ({
  uniqueUserRating: primaryKey({ columns: [table.userId, table.challengeId] }),
}));

export const ChallengeRatingsRelations = relations(ChallengeRatings, ({ one }) => ({
  user: one(User, { fields: [ChallengeRatings.userId], references: [User.id] }),
  challenge: one(Challenges, { fields: [ChallengeRatings.challengeId], references: [Challenges.id] }),
}));
