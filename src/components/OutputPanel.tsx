"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { TestResultItem } from "./TestResultItem";
import type { CompileResult, TestResult } from "@/lib/types";
import { TerminalIcon, FlaskConicalIcon, CheckCircle2Icon } from "lucide-react";

interface OutputPanelProps {
  output: CompileResult | null;
  testResults: TestResult[] | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function OutputPanel({
  output,
  testResults,
  activeTab,
  onTabChange,
}: OutputPanelProps) {
  const passCount = testResults?.filter((r) => r.passed).length ?? 0;
  const totalCount = testResults?.length ?? 0;
  const allPassed = testResults && passCount === totalCount && totalCount > 0;

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => onTabChange(v as string)}
      className="h-full gap-0"
    >
      <div className="shrink-0 flex items-center border-b bg-card px-3 py-1.5">
        <TabsList>
          <TabsTrigger value="output">
            <TerminalIcon />
            Output
          </TabsTrigger>
          <TabsTrigger value="tests">
            <FlaskConicalIcon />
            Tests
            {testResults && (
              <Badge
                variant={allPassed ? "secondary" : "destructive"}
                className="ml-0.5"
              >
                {passCount}/{totalCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="output" className="flex-1">
        <ScrollArea className="h-full">
          <div className="p-3 font-mono text-xs whitespace-pre-wrap leading-relaxed">
            {output ? (
              <>
                {output.stderr && (
                  <div className="text-destructive mb-2">{output.stderr}</div>
                )}
                {output.stdout && <div>{output.stdout}</div>}
                {output.timedOut && (
                  <div className="text-muted-foreground mt-2">
                    Process timed out (5s limit)
                  </div>
                )}
                {!output.stdout && !output.stderr && (
                  <div className="text-muted-foreground">(no output)</div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground text-xs">
                Run your code to see output here
              </p>
            )}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="tests" className="flex-1">
        <ScrollArea className="h-full">
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
      </TabsContent>
    </Tabs>
  );
}
