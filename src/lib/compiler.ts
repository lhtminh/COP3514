import { execFile } from "child_process";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import type { CompileResult, TestCase, TestResult } from "./types";

const USE_LOCAL_GCC = process.env.USE_LOCAL_GCC === "true";
const JUDGE0_API_URL =
  process.env.JUDGE0_API_URL || "https://ce.judge0.com";
const C_LANGUAGE_ID = 103; // C (GCC 14.1.0)
const TIMEOUT_MS = 5000;
const MAX_OUTPUT = 64 * 1024; // 64KB

// ─── Judge0 API (for Vercel / production) ────────────────

interface Judge0Status {
  id: number;
  description: string;
}

interface Judge0Response {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: Judge0Status;
  time: string | null;
  memory: number | null;
}

function toBase64(str: string): string {
  return Buffer.from(str).toString("base64");
}

function fromBase64(str: string | null): string {
  if (!str) return "";
  return Buffer.from(str, "base64").toString("utf-8");
}

async function judge0Execute(
  code: string,
  stdin: string = ""
): Promise<CompileResult> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Support optional RapidAPI key
  const rapidApiKey = process.env.JUDGE0_RAPIDAPI_KEY;
  if (rapidApiKey) {
    headers["X-RapidAPI-Key"] = rapidApiKey;
    headers["X-RapidAPI-Host"] = new URL(JUDGE0_API_URL).host;
  }

  const response = await fetch(
    `${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        source_code: toBase64(code),
        language_id: C_LANGUAGE_ID,
        stdin: toBase64(stdin),
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Judge0 API error: ${response.status} - ${text}`);
  }

  const result: Judge0Response = await response.json();

  // Status 6 = Compilation Error
  if (result.status.id === 6) {
    return {
      stdout: "",
      stderr: fromBase64(result.compile_output),
      exitCode: 1,
    };
  }

  // Status 5 = Time Limit Exceeded
  if (result.status.id === 5) {
    return {
      stdout: fromBase64(result.stdout),
      stderr: fromBase64(result.stderr),
      exitCode: 1,
      timedOut: true,
    };
  }

  // Status 3 = Accepted, others = runtime errors
  return {
    stdout: fromBase64(result.stdout),
    stderr:
      fromBase64(result.stderr) || fromBase64(result.compile_output),
    exitCode: result.status.id === 3 ? 0 : 1,
    timedOut: false,
  };
}

// ─── Local GCC (for development) ─────────────────────────

function truncate(s: string): string {
  return s.length > MAX_OUTPUT
    ? s.slice(0, MAX_OUTPUT) + "\n...(truncated)"
    : s;
}

async function makeTempDir(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), "cgym-"));
}

async function cleanupDir(dir: string): Promise<void> {
  try {
    await fs.rm(dir, { recursive: true, force: true });
  } catch {
    // best effort
  }
}

function runProcess(
  cmd: string,
  args: string[],
  options: { cwd?: string; stdin?: string; timeout?: number }
): Promise<CompileResult> {
  return new Promise((resolve) => {
    const child = execFile(
      cmd,
      args,
      {
        cwd: options.cwd,
        timeout: options.timeout ?? TIMEOUT_MS,
        maxBuffer: MAX_OUTPUT * 2,
        windowsHide: true,
      },
      (error, stdout, stderr) => {
        const timedOut = error && "killed" in error && error.killed;
        let exitCode: number | null = 0;
        if (error) {
          const errWithCode = error as Error & { code?: number | string };
          exitCode =
            typeof errWithCode.code === "number" ? errWithCode.code : 1;
        }
        resolve({
          stdout: truncate(stdout ?? ""),
          stderr: truncate(stderr ?? ""),
          exitCode,
          timedOut: !!timedOut,
        });
      }
    );

    if (options.stdin && child.stdin) {
      child.stdin.write(options.stdin);
      child.stdin.end();
    }
  });
}

async function localCompile(code: string): Promise<{
  success: boolean;
  stderr: string;
  tempDir: string;
  exePath: string;
}> {
  const tempDir = await makeTempDir();
  const srcPath = path.join(tempDir, "solution.c");
  const exePath = path.join(tempDir, "solution.exe");

  await fs.writeFile(srcPath, code, "utf-8");

  const result = await runProcess(
    "gcc",
    [srcPath, "-o", exePath, "-Wall", "-std=c17"],
    { cwd: tempDir, timeout: 15000 }
  );

  return {
    success: result.exitCode === 0 && !result.timedOut,
    stderr: result.stderr,
    tempDir,
    exePath,
  };
}

async function localCompileAndRun(
  code: string,
  stdin: string = ""
): Promise<CompileResult> {
  let tempDir = "";
  try {
    const comp = await localCompile(code);
    tempDir = comp.tempDir;
    if (!comp.success) {
      return { stdout: "", stderr: comp.stderr, exitCode: 1 };
    }
    return await runProcess(comp.exePath, [], {
      cwd: comp.tempDir,
      stdin,
      timeout: TIMEOUT_MS,
    });
  } finally {
    if (tempDir) await cleanupDir(tempDir);
  }
}

async function localRunTests(
  code: string,
  testCases: TestCase[]
): Promise<TestResult[]> {
  let tempDir = "";
  try {
    const comp = await localCompile(code);
    tempDir = comp.tempDir;

    if (!comp.success) {
      return testCases.map((tc) => ({
        testCaseId: tc.id,
        label: tc.label,
        passed: false,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: "",
        stderr: comp.stderr,
        exitCode: 1,
      }));
    }

    const results: TestResult[] = [];
    for (const tc of testCases) {
      const run = await runProcess(comp.exePath, [], {
        cwd: comp.tempDir,
        stdin: tc.input,
        timeout: TIMEOUT_MS,
      });

      const actual = run.stdout.replace(/\r\n/g, "\n").trim();
      const expected = tc.expectedOutput.replace(/\r\n/g, "\n").trim();

      results.push({
        testCaseId: tc.id,
        label: tc.label,
        passed: actual === expected && run.exitCode === 0 && !run.timedOut,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: run.stdout,
        stderr: run.stderr,
        exitCode: run.exitCode,
        timedOut: run.timedOut,
      });
    }

    return results;
  } finally {
    if (tempDir) await cleanupDir(tempDir);
  }
}

// ─── Public API ──────────────────────────────────────────

export async function compileAndRun(
  code: string,
  stdin: string = ""
): Promise<CompileResult> {
  if (USE_LOCAL_GCC) {
    return localCompileAndRun(code, stdin);
  }
  return judge0Execute(code, stdin);
}

export async function runTests(
  code: string,
  testCases: TestCase[]
): Promise<TestResult[]> {
  if (USE_LOCAL_GCC) {
    return localRunTests(code, testCases);
  }

  // Run all test cases in parallel via API
  const results = await Promise.all(
    testCases.map(async (tc) => {
      const run = await judge0Execute(code, tc.input);

      const actual = run.stdout.replace(/\r\n/g, "\n").trim();
      const expected = tc.expectedOutput.replace(/\r\n/g, "\n").trim();

      return {
        testCaseId: tc.id,
        label: tc.label,
        passed: actual === expected && run.exitCode === 0 && !run.timedOut,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: run.stdout,
        stderr: run.stderr,
        exitCode: run.exitCode,
        timedOut: run.timedOut,
      } as TestResult;
    })
  );

  return results;
}
