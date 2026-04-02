import { getExercises, createExercise } from "@/lib/storage";
import type { Exercise } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const exercises = await getExercises();
    return Response.json(exercises);
  } catch (error) {
    return Response.json(
      { error: "Failed to load exercises", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Omit<Exercise, "id">;

    if (!body.title || typeof body.title !== "string") {
      return Response.json({ error: "title is required" }, { status: 400 });
    }

    const exercise: Exercise = {
      ...body,
      id: crypto.randomUUID(),
      tags: body.tags ?? [],
      difficulty: body.difficulty ?? "easy",
      starterCode:
        body.starterCode ||
        '#include <stdio.h>\n\nint main() {\n    // Your code here\n    \n    return 0;\n}',
      testCases: body.testCases ?? [],
    };

    await createExercise(exercise);
    return Response.json(exercise, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create exercise", details: String(error) },
      { status: 500 }
    );
  }
}
