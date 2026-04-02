"use client";

import type { TestResult } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2Icon, XCircleIcon, ClockIcon } from "lucide-react";

interface TestResultItemProps {
  result: TestResult;
  index: number;
}

export function TestResultItem({ result, index }: TestResultItemProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-3 text-sm transition-colors",
        result.passed
          ? "border-primary/20 bg-primary/5"
          : "border-destructive/20 bg-destructive/5"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {result.passed ? (
          <CheckCircle2Icon className="size-4 text-primary" />
        ) : (
          <XCircleIcon className="size-4 text-destructive" />
        )}
        <span className="font-medium text-xs">
          {result.label || `Test Case ${index + 1}`}
        </span>
        {result.timedOut && (
          <Badge variant="secondary" className="text-[10px] gap-1">
            <ClockIcon className="size-3" />
            timeout
          </Badge>
        )}
      </div>
      <div className="font-mono text-[11px] flex flex-col gap-0.5 pl-6">
        <div>
          <span className="text-muted-foreground select-none">stdin: </span>
          <span className="whitespace-pre-wrap">
            {result.input || "(none)"}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground select-none">expected: </span>
          <span className="whitespace-pre-wrap">{result.expectedOutput}</span>
        </div>
        <div>
          <span className="text-muted-foreground select-none">actual: </span>
          <span
            className={cn(
              "whitespace-pre-wrap",
              !result.passed && "text-destructive"
            )}
          >
            {result.actualOutput || "(no output)"}
          </span>
        </div>
        {result.stderr && (
          <div>
            <span className="text-muted-foreground select-none">stderr: </span>
            <span className="whitespace-pre-wrap text-muted-foreground">
              {result.stderr}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
