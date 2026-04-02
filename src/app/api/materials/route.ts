import { getMaterials, createMaterial, ensureMaterialsDir, getMaterialsDir } from "@/lib/storage";
import type { Material } from "@/lib/types";
import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const materials = await getMaterials();
    return Response.json(materials);
  } catch (error) {
    return Response.json(
      { error: "Failed to load materials", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const filename = file.name;
    const ext = path.extname(filename).toLowerCase();

    if (ext !== ".pdf" && ext !== ".pptx") {
      return Response.json(
        { error: "Only PDF and PPTX files are supported" },
        { status: 400 }
      );
    }

    await ensureMaterialsDir();

    const id = crypto.randomUUID();
    const storedName = `${id}${ext}`;
    const filePath = path.join("data", "materials", storedName);
    const fullPath = path.join(getMaterialsDir(), storedName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(fullPath, buffer);

    const material: Material = {
      id,
      filename,
      type: ext === ".pdf" ? "pdf" : "pptx",
      uploadedAt: new Date().toISOString(),
      filePath,
    };

    await createMaterial(material);
    return Response.json(material, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Failed to upload material", details: String(error) },
      { status: 500 }
    );
  }
}
