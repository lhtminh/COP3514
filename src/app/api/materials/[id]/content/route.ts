import { getMaterial } from "@/lib/storage";
import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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

    const fullPath = path.join(process.cwd(), material.filePath);
    const buffer = await fs.readFile(fullPath);

    const contentType =
      material.type === "pdf"
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.presentationml.presentation";

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${material.filename}"`,
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to serve file", details: String(error) },
      { status: 500 }
    );
  }
}
