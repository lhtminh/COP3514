"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { TestResultItem } from "./TestResultItem";
import type { CompileResult, TestResult } from "@/lib/types";
import { TerminalIcon, FlaskConicalIcon } from "lucide-react";

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
  const allPassed = testResults && passCount === totalCount;

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => onTabChange(v as string)}
      className="flex flex-col h-full"
    >
      <TabsList className="mx-2 mt-1.5 w-fit">
        <TabsTrigger value="output">
          <TerminalIcon className="size-3 mr-1" />
          Output
        </TabsTrigger>
        <TabsTrigger value="tests">
          <FlaskConicalIcon className="size-3 mr-1" />
          Tests
          {testResults && (
            <Badge
              variant={allPassed ? "default" : "secondary"}
              className="ml-1.5 text-[10px] px-1.5 py-0"
            >
              {passCount}/{totalCount}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="output" className="flex-1 m-0 mt-1">
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
              <div className="text-muted-foreground">
                Run your code to see output here
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="tests" className="flex-1 m-0 mt-1">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-2 p-3">
            {testResults ? (
              testResults.map((result, idx) => (
                <TestResultItem
                  key={result.testCaseId}
                  result={result}
                  index={idx}
                />
              ))
            ) : (
              <div className="text-xs text-muted-foreground">
                Click &quot;Test&quot; to run test cases
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
