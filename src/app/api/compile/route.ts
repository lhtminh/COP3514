import { compileAndRun } from "@/lib/compiler";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, stdin } = body as { code: string; stdin?: string };

    if (!code || typeof code !== "string") {
      return Response.json({ error: "code is required" }, { status: 400 });
    }

    const result = await compileAndRun(code, stdin ?? "");
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
