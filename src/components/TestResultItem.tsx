"use client";

import { useState } from "react";
import type { TestResult } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2Icon, XCircleIcon, ClockIcon, ChevronRightIcon } from "lucide-react";

interface TestResultItemProps {
  result: TestResult;
  index: number;
}

export function TestResultItem({ result, index }: TestResultItemProps) {
  const [expanded, setExpanded] = useState(!result.passed);

  return (
    <div
      className={cn(
        "rounded-lg border transition-colors",
        result.passed
          ? "border-emerald-500/20 bg-emerald-500/5"
          : "border-destructive/20 bg-destructive/5"
      )}
    >
      <Button
        variant="ghost"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-2 w-full h-auto px-3 py-2 text-left justify-start rounded-none"
      >
        {result.passed ? (
          <CheckCircle2Icon className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        ) : (
          <XCircleIcon className="size-3.5 text-destructive shrink-0" />
        )}
        <span className="font-medium text-xs truncate flex-1">
          {result.label || `Test ${index + 1}`}
        </span>
        {result.timedOut && (
          <Badge variant="secondary" className="text-[9px] gap-1 h-4 px-1.5">
            <ClockIcon className="size-2.5" />
            TLE
          </Badge>
        )}
        <Badge
          variant="outline"
          className={cn(
            "text-[9px] h-4 px-1.5 font-semibold",
            result.passed
              ? "text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              : "text-destructive border-destructive/30"
          )}
        >
          {result.passed ? "PASS" : "FAIL"}
        </Badge>
        <ChevronRightIcon
          className={cn(
            "size-3 text-muted-foreground transition-transform shrink-0",
            expanded && "rotate-90"
          )}
        />
      </Button>

      {expanded && (
        <div className="font-mono text-[11px] flex flex-col gap-1 px-3 pb-2.5 pt-0">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground/70 font-sans uppercase tracking-wider">
              stdin
            </span>
            <div className="rounded-sm bg-muted/50 px-2 py-1 whitespace-pre-wrap">
              {result.input || "(none)"}
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground/70 font-sans uppercase tracking-wider">
              expected
            </span>
            <div className="rounded-sm bg-muted/50 px-2 py-1 whitespace-pre-wrap">
              {result.expectedOutput}
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground/70 font-sans uppercase tracking-wider">
              actual
            </span>
            <div
              className={cn(
                "rounded-sm px-2 py-1 whitespace-pre-wrap",
                result.passed ? "bg-muted/50" : "bg-destructive/10"
              )}
            >
              {result.actualOutput || "(no output)"}
            </div>
          </div>
          {result.stderr && (
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground/70 font-sans uppercase tracking-wider">
                stderr
              </span>
              <div className="rounded-sm bg-muted/50 px-2 py-1 whitespace-pre-wrap text-muted-foreground">
                {result.stderr}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
