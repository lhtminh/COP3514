import {
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);
export const exerciseTypeEnum = pgEnum("exercise_type", [
  "coding",
  "multiple-choice",
]);
export const materialTypeEnum = pgEnum("material_type", ["pdf", "pptx"]);

export const exercises = pgTable("exercises", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  difficulty: difficultyEnum("difficulty").notNull().default("easy"),
  type: exerciseTypeEnum("type").notNull().default("coding"),
  tags: text("tags").array().notNull().default([]),
  starterCode: text("starter_code").notNull().default(""),
  testCases: jsonb("test_cases").notNull().default([]),
  codeSnippet: text("code_snippet"),
  choices: jsonb("choices"),
  correctAnswer: varchar("correct_answer", { length: 10 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const progress = pgTable("progress", {
  exerciseId: text("exercise_id")
    .references(() => exercises.id, { onDelete: "cascade" })
    .primaryKey(),
  code: text("code").notNull().default(""),
  solved: boolean("solved").notNull().default(false),
  lastAttemptAt: timestamp("last_attempt_at").defaultNow().notNull(),
});

export const materials = pgTable("materials", {
  id: text("id").primaryKey(),
  filename: text("filename").notNull(),
  type: materialTypeEnum("type").notNull(),
  filePath: text("file_path").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});
