import { getMaterial, deleteMaterial } from "@/lib/storage";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const material = await getMaterial(id);
    if (!material) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json(material);
  } catch (error) {
    return Response.json(
      { error: "Failed to load material", details: String(error) },
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
    const deleted = await deleteMaterial(id);
    if (!deleted) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Failed to delete material", details: String(error) },
      { status: 500 }
    );
  }
}
