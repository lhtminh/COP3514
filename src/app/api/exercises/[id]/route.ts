import {
  getExercise,
  updateExercise,
  deleteExercise,
} from "@/lib/storage";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const exercise = await getExercise(id);
    if (!exercise) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json(exercise);
  } catch (error) {
    return Response.json(
      { error: "Failed to load exercise", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = await updateExercise(id, body);
    if (!updated) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json(updated);
  } catch (error) {
    return Response.json(
      { error: "Failed to update exercise", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const deleted = await deleteExercise(id);
    if (!deleted) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Failed to delete exercise", details: String(error) },
      { status: 500 }
    );
  }
}
