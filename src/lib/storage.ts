import { promises as fs } from "fs";
import path from "path";
import type { Exercise, ExerciseProgress, Material } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const MATERIALS_DIR = path.join(DATA_DIR, "materials");

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await ensureDir(path.dirname(filePath));
  const tmp = filePath + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmp, filePath);
}

// === Exercises ===

const exercisesPath = () => path.join(DATA_DIR, "exercises.json");

export async function getExercises(): Promise<Exercise[]> {
  return readJson<Exercise[]>(exercisesPath(), []);
}

export async function getExercise(id: string): Promise<Exercise | undefined> {
  const exercises = await getExercises();
  return exercises.find((e) => e.id === id);
}

export async function createExercise(exercise: Exercise): Promise<Exercise> {
  const exercises = await getExercises();
  exercises.push(exercise);
  await writeJson(exercisesPath(), exercises);
  return exercise;
}

export async function updateExercise(
  id: string,
  updates: Partial<Omit<Exercise, "id">>
): Promise<Exercise | undefined> {
  const exercises = await getExercises();
  const idx = exercises.findIndex((e) => e.id === id);
  if (idx === -1) return undefined;
  exercises[idx] = { ...exercises[idx], ...updates };
  await writeJson(exercisesPath(), exercises);
  return exercises[idx];
}

export async function deleteExercise(id: string): Promise<boolean> {
  const exercises = await getExercises();
  const filtered = exercises.filter((e) => e.id !== id);
  if (filtered.length === exercises.length) return false;
  await writeJson(exercisesPath(), filtered);
  return true;
}

// === Progress ===

const progressPath = () => path.join(DATA_DIR, "progress.json");

export async function getProgress(): Promise<ExerciseProgress[]> {
  return readJson<ExerciseProgress[]>(progressPath(), []);
}

export async function getExerciseProgress(
  exerciseId: string
): Promise<ExerciseProgress | undefined> {
  const progress = await getProgress();
  return progress.find((p) => p.exerciseId === exerciseId);
}

export async function upsertProgress(
  data: ExerciseProgress
): Promise<ExerciseProgress> {
  const progress = await getProgress();
  const idx = progress.findIndex((p) => p.exerciseId === data.exerciseId);
  if (idx === -1) {
    progress.push(data);
  } else {
    progress[idx] = data;
  }
  await writeJson(progressPath(), progress);
  return data;
}

// === Materials ===

const materialsPath = () => path.join(DATA_DIR, "materials.json");

export async function getMaterials(): Promise<Material[]> {
  return readJson<Material[]>(materialsPath(), []);
}

export async function getMaterial(id: string): Promise<Material | undefined> {
  const materials = await getMaterials();
  return materials.find((m) => m.id === id);
}

export async function createMaterial(material: Material): Promise<Material> {
  const materials = await getMaterials();
  materials.push(material);
  await writeJson(materialsPath(), materials);
  return material;
}

export async function deleteMaterial(id: string): Promise<boolean> {
  const materials = await getMaterials();
  const mat = materials.find((m) => m.id === id);
  if (!mat) return false;
  // Delete the file
  try {
    await fs.unlink(path.join(process.cwd(), mat.filePath));
  } catch {
    // file may already be gone
  }
  const filtered = materials.filter((m) => m.id !== id);
  await writeJson(materialsPath(), filtered);
  return true;
}

export function getMaterialsDir(): string {
  return MATERIALS_DIR;
}

export async function ensureMaterialsDir(): Promise<void> {
  await ensureDir(MATERIALS_DIR);
}
