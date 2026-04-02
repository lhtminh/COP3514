"use client";

import type { TestResult } from "@/lib/types";

interface TestResultItemProps {
  result: TestResult;
  index: number;
}

export function TestResultItem({ result, index }: TestResultItemProps) {
  return (
    <div
      className={`rounded-md border p-3 text-sm ${
        result.passed
          ? "border-green-500/30 bg-green-50 dark:bg-green-950/20"
          : "border-red-500/30 bg-red-50 dark:bg-red-950/20"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`font-medium ${
            result.passed ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
          }`}
        >
          {result.passed ? "PASS" : "FAIL"}
        </span>
        <span className="text-muted-foreground">
          {result.label || `Test Case ${index + 1}`}
        </span>
        {result.timedOut && (
          <span className="text-yellow-600 dark:text-yellow-400 text-xs">
            (timed out)
          </span>
        )}
      </div>
      <div className="font-mono text-xs space-y-1">
        <div>
          <span className="text-muted-foreground">Input: </span>
          <span className="whitespace-pre-wrap">{result.input || "(none)"}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Expected: </span>
          <span className="whitespace-pre-wrap">{result.expectedOutput}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Actual: </span>
          <span
            className={`whitespace-pre-wrap ${
              !result.passed ? "text-red-700 dark:text-red-400" : ""
            }`}
          >
            {result.actualOutput || "(no output)"}
          </span>
        </div>
        {result.stderr && (
          <div>
            <span className="text-muted-foreground">Stderr: </span>
            <span className="whitespace-pre-wrap text-yellow-700 dark:text-yellow-400">
              {result.stderr}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
