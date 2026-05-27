import { promises as fs } from "fs";
import path from "path";
import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./schema";
import type { Exercise, ExerciseProgress, Material } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const MATERIALS_DIR = path.join(DATA_DIR, "materials");

// === Row <-> Domain mappers ===

function rowToExercise(row: typeof schema.exercises.$inferSelect): Exercise {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    difficulty: row.difficulty,
    type: row.type,
    tags: row.tags,
    starterCode: row.starterCode,
    testCases: row.testCases as Exercise["testCases"],
    codeSnippet: row.codeSnippet ?? undefined,
    choices: row.choices as Exercise["choices"],
    correctAnswer: row.correctAnswer ?? undefined,
  };
}

// === Exercises ===

export async function getExercises(): Promise<Exercise[]> {
  const rows = await db.select().from(schema.exercises);
  return rows.map(rowToExercise);
}

export async function getExercise(id: string): Promise<Exercise | undefined> {
  const rows = await db
    .select()
    .from(schema.exercises)
    .where(eq(schema.exercises.id, id))
    .limit(1);
  return rows[0] ? rowToExercise(rows[0]) : undefined;
}

export async function createExercise(exercise: Exercise): Promise<Exercise> {
  await db.insert(schema.exercises).values({
    id: exercise.id,
    title: exercise.title,
    description: exercise.description,
    difficulty: exercise.difficulty,
    type: exercise.type ?? "coding",
    tags: exercise.tags,
    starterCode: exercise.starterCode,
    testCases: exercise.testCases,
    codeSnippet: exercise.codeSnippet ?? null,
    choices: exercise.choices ?? null,
    correctAnswer: exercise.correctAnswer ?? null,
  });
  return exercise;
}

export async function updateExercise(
  id: string,
  updates: Partial<Omit<Exercise, "id">>
): Promise<Exercise | undefined> {
  const values: Record<string, unknown> = {};
  if (updates.title !== undefined) values.title = updates.title;
  if (updates.description !== undefined) values.description = updates.description;
  if (updates.difficulty !== undefined) values.difficulty = updates.difficulty;
  if (updates.type !== undefined) values.type = updates.type;
  if (updates.tags !== undefined) values.tags = updates.tags;
  if (updates.starterCode !== undefined) values.starterCode = updates.starterCode;
  if (updates.testCases !== undefined) values.testCases = updates.testCases;
  if (updates.codeSnippet !== undefined) values.codeSnippet = updates.codeSnippet;
  if (updates.choices !== undefined) values.choices = updates.choices;
  if (updates.correctAnswer !== undefined) values.correctAnswer = updates.correctAnswer;

  const rows = await db
    .update(schema.exercises)
    .set(values)
    .where(eq(schema.exercises.id, id))
    .returning();

  return rows[0] ? rowToExercise(rows[0]) : undefined;
}

export async function deleteExercise(id: string): Promise<boolean> {
  const result = await db
    .delete(schema.exercises)
    .where(eq(schema.exercises.id, id))
    .returning({ id: schema.exercises.id });
  return result.length > 0;
}

// === Progress ===

export async function getProgress(): Promise<ExerciseProgress[]> {
  const rows = await db.select().from(schema.progress);
  return rows.map((r) => ({
    exerciseId: r.exerciseId,
    code: r.code,
    solved: r.solved,
    lastAttemptAt: r.lastAttemptAt.toISOString(),
  }));
}

export async function getExerciseProgress(
  exerciseId: string
): Promise<ExerciseProgress | undefined> {
  const rows = await db
    .select()
    .from(schema.progress)
    .where(eq(schema.progress.exerciseId, exerciseId))
    .limit(1);
  if (!rows[0]) return undefined;
  return {
    exerciseId: rows[0].exerciseId,
    code: rows[0].code,
    solved: rows[0].solved,
    lastAttemptAt: rows[0].lastAttemptAt.toISOString(),
  };
}

export async function upsertProgress(
  data: ExerciseProgress
): Promise<ExerciseProgress> {
  await db
    .insert(schema.progress)
    .values({
      exerciseId: data.exerciseId,
      code: data.code,
      solved: data.solved,
      lastAttemptAt: new Date(data.lastAttemptAt),
    })
    .onConflictDoUpdate({
      target: schema.progress.exerciseId,
      set: {
        code: data.code,
        solved: data.solved,
        lastAttemptAt: new Date(data.lastAttemptAt),
      },
    });
  return data;
}

// === Materials ===

export async function getMaterials(): Promise<Material[]> {
  const rows = await db.select().from(schema.materials);
  return rows.map((r) => ({
    id: r.id,
    filename: r.filename,
    type: r.type,
    uploadedAt: r.uploadedAt.toISOString(),
    filePath: r.filePath,
  }));
}

export async function getMaterial(id: string): Promise<Material | undefined> {
  const rows = await db
    .select()
    .from(schema.materials)
    .where(eq(schema.materials.id, id))
    .limit(1);
  if (!rows[0]) return undefined;
  return {
    id: rows[0].id,
    filename: rows[0].filename,
    type: rows[0].type,
    uploadedAt: rows[0].uploadedAt.toISOString(),
    filePath: rows[0].filePath,
  };
}

export async function createMaterial(material: Material): Promise<Material> {
  await db.insert(schema.materials).values({
    id: material.id,
    filename: material.filename,
    type: material.type,
    filePath: material.filePath,
    uploadedAt: new Date(material.uploadedAt),
  });
  return material;
}

export async function deleteMaterial(id: string): Promise<boolean> {
  const rows = await db
    .select({ filePath: schema.materials.filePath })
    .from(schema.materials)
    .where(eq(schema.materials.id, id))
    .limit(1);

  if (!rows[0]) return false;

  try {
    await fs.unlink(path.join(process.cwd(), rows[0].filePath));
  } catch {
    // file may already be gone
  }

  await db.delete(schema.materials).where(eq(schema.materials.id, id));
  return true;
}

export function getMaterialsDir(): string {
  return MATERIALS_DIR;
}

export async function ensureMaterialsDir(): Promise<void> {
  await fs.mkdir(MATERIALS_DIR, { recursive: true });
}
