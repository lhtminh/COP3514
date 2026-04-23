import { execFile } from "child_process";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import type { CompileResult, TestCase, TestResult } from "./types";

const TIMEOUT_MS = 5000;
const MAX_OUTPUT = 64 * 1024; // 64KB

function truncate(s: string): string {
  return s.length > MAX_OUTPUT ? s.slice(0, MAX_OUTPUT) + "\n...(truncated)" : s;
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

export async function compile(code: string): Promise<{
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

export async function compileAndRun(
  code: string,
  stdin: string = ""
): Promise<CompileResult> {
  let tempDir = "";
  try {
    const comp = await compile(code);
    tempDir = comp.tempDir;
    if (!comp.success) {
      return {
        stdout: "",
        stderr: comp.stderr,
        exitCode: 1,
      };
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

export async function runTests(
  code: string,
  testCases: TestCase[]
): Promise<TestResult[]> {
  let tempDir = "";
  try {
    const comp = await compile(code);
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
