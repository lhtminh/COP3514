"use client";

import { CodeEditor } from "./CodeEditor";
import { ControlBar } from "./ControlBar";
import { OutputPanel } from "./OutputPanel";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import type { CompileResult, TestResult, Exercise } from "@/lib/types";

interface EditorPanelProps {
  code: string;
  onCodeChange: (code: string) => void;
  exercise: Exercise | null;
  onRun: () => void;
  onTest: () => void;
  onReset: () => void;
  running: boolean;
  testing: boolean;
  output: CompileResult | null;
  testResults: TestResult[] | null;
  outputTab: string;
  onOutputTabChange: (tab: string) => void;
}

export function EditorPanel({
  code,
  onCodeChange,
  exercise,
  onRun,
  onTest,
  onReset,
  running,
  testing,
  output,
  testResults,
  outputTab,
  onOutputTabChange,
}: EditorPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <ResizablePanelGroup orientation="vertical" className="flex-1">
        <ResizablePanel defaultSize="60" minSize="25">
          <div className="h-full flex flex-col">
            <div className="shrink-0 flex items-center border-b bg-card px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-primary/40" />
                <span className="text-xs font-semibold text-muted-foreground tracking-wide">
                  solution.c
                </span>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <CodeEditor value={code} onChange={onCodeChange} />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize="40" minSize="15">
          <OutputPanel
            output={output}
            testResults={testResults}
            activeTab={outputTab}
            onTabChange={onOutputTabChange}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      <ControlBar
        onRun={onRun}
        onTest={onTest}
        onReset={onReset}
        running={running}
        testing={testing}
        hasTestCases={!!exercise && exercise.testCases.length > 0}
      />
    </div>
  );
}
