import { runTests } from "@/lib/compiler";
import type { TestCase } from "@/lib/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, testCases } = body as {
      code: string;
      testCases: TestCase[];
    };

    if (!code || typeof code !== "string") {
      return Response.json({ error: "code is required" }, { status: 400 });
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return Response.json(
        { error: "testCases array is required" },
        { status: 400 }
      );
    }

    const results = await runTests(code, testCases);
    const allPassed = results.every((r) => r.passed);

    return Response.json({ results, allPassed });
  } catch (error) {
    return Response.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
