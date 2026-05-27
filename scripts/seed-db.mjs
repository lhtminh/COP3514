import { readFileSync } from "fs";
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL env var is required");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { prepare: false });

const exercises = JSON.parse(
  readFileSync("data/exercises.json", "utf-8")
);

console.log(`Seeding ${exercises.length} exercises...`);

let inserted = 0;
for (const ex of exercises) {
  try {
    await sql`
      INSERT INTO exercises (id, title, description, difficulty, type, tags, starter_code, test_cases, code_snippet, choices, correct_answer)
      VALUES (
        ${ex.id},
        ${ex.title},
        ${ex.description || ""},
        ${ex.difficulty || "easy"},
        ${ex.type || "coding"},
        ${ex.tags || []},
        ${ex.starterCode || ""},
        ${JSON.stringify(ex.testCases || [])},
        ${ex.codeSnippet || null},
        ${ex.choices ? JSON.stringify(ex.choices) : null},
        ${ex.correctAnswer || null}
      )
      ON CONFLICT (id) DO NOTHING
    `;
    inserted++;
  } catch (err) {
    console.error(`Failed to insert "${ex.title}":`, err.message);
  }
}

console.log(`Done. Inserted ${inserted}/${exercises.length} exercises.`);

// Seed progress if it exists
try {
  const progress = JSON.parse(
    readFileSync("data/progress.json", "utf-8")
  );
  if (progress.length > 0) {
    console.log(`Seeding ${progress.length} progress records...`);
    let pInserted = 0;
    for (const p of progress) {
      try {
        await sql`
          INSERT INTO progress (exercise_id, code, solved, last_attempt_at)
          VALUES (
            ${p.exerciseId},
            ${p.code || ""},
            ${p.solved || false},
            ${p.lastAttemptAt ? new Date(p.lastAttemptAt) : new Date()}
          )
          ON CONFLICT (exercise_id) DO NOTHING
        `;
        pInserted++;
      } catch (err) {
        // Exercise might not exist, skip
      }
    }
    console.log(`Done. Inserted ${pInserted}/${progress.length} progress records.`);
  }
} catch {
  console.log("No progress.json found, skipping.");
}

await sql.end();
