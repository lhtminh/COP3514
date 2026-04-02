"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestResultItem } from "./TestResultItem";
import type { CompileResult, TestResult } from "@/lib/types";

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
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="flex flex-col h-full">
      <TabsList className="mx-2 mt-1 w-fit">
        <TabsTrigger value="output">Output</TabsTrigger>
        <TabsTrigger value="tests">
          Test Results
          {testResults && (
            <span className="ml-1.5 text-xs">
              ({testResults.filter((r) => r.passed).length}/{testResults.length})
            </span>
          )}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="output" className="flex-1 m-0 mt-1">
        <ScrollArea className="h-full">
          <div className="p-3 font-mono text-sm whitespace-pre-wrap">
            {output ? (
              <>
                {output.stderr && (
                  <div className="text-red-600 dark:text-red-400 mb-2">
                    {output.stderr}
                  </div>
                )}
                {output.stdout && <div>{output.stdout}</div>}
                {output.timedOut && (
                  <div className="text-yellow-600 dark:text-yellow-400 mt-2">
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
          <div className="p-3 space-y-2">
            {testResults ? (
              testResults.map((result, idx) => (
                <TestResultItem key={result.testCaseId} result={result} index={idx} />
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                Click &quot;Test&quot; to run test cases
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
