"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TestResultItem } from "./TestResultItem";
import type { TestResult } from "@/lib/types";
import { FlaskConicalIcon, CheckCircle2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OutputPanelProps {
  testResults: TestResult[] | null;
}

export function OutputPanel({ testResults }: OutputPanelProps) {
  const passCount = testResults?.filter((r) => r.passed).length ?? 0;
  const totalCount = testResults?.length ?? 0;
  const allPassed = testResults && passCount === totalCount && totalCount > 0;

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 flex items-center gap-2 border-b px-4 py-2">
        <FlaskConicalIcon className="size-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground tracking-wide">
          Tests
        </span>
        {testResults && (
          <Badge variant={allPassed ? "secondary" : "destructive"}>
            {passCount}/{totalCount}
          </Badge>
        )}
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-1.5 p-3">
          {testResults ? (
            testResults.length > 0 ? (
              <>
                {allPassed && (
                  <div className="flex items-center justify-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-0.5">
                    <CheckCircle2Icon className="size-3.5" />
                    All test cases passed
                  </div>
                )}
                {testResults.map((result, idx) => (
                  <TestResultItem
                    key={result.testCaseId}
                    result={result}
                    index={idx}
                  />
                ))}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                No test results
              </p>
            )
          ) : (
            <p className="text-xs text-muted-foreground">
              Click &quot;Test&quot; to run test cases
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
