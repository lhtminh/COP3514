import { getExerciseProgress, upsertProgress } from "@/lib/storage";
import type { ExerciseProgress } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ exerciseId: string }> }
) {
  const { exerciseId } = await params;
  try {
    const progress = await getExerciseProgress(exerciseId);
    if (!progress) {
      return Response.json({ exerciseId, code: "", solved: false, lastAttemptAt: "" });
    }
    return Response.json(progress);
  } catch (error) {
    return Response.json(
      { error: "Failed to load progress", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ exerciseId: string }> }
) {
  const { exerciseId } = await params;
  try {
    const body = await request.json();
    const progress: ExerciseProgress = {
      exerciseId,
      code: body.code ?? "",
      solved: body.solved ?? false,
      lastAttemptAt: new Date().toISOString(),
    };
    await upsertProgress(progress);
    return Response.json(progress);
  } catch (error) {
    return Response.json(
      { error: "Failed to save progress", details: String(error) },
      { status: 500 }
    );
  }
}
