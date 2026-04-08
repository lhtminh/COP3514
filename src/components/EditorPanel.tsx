"use client";

import { CodeEditor } from "./CodeEditor";
import { ControlBar } from "./ControlBar";
import { OutputPanel } from "./OutputPanel";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import type { TestResult, Exercise } from "@/lib/types";

interface EditorPanelProps {
  code: string;
  onCodeChange: (code: string) => void;
  exercise: Exercise | null;
  onTest: () => void;
  onReset: () => void;
  testing: boolean;
  testResults: TestResult[] | null;
}

export function EditorPanel({
  code,
  onCodeChange,
  exercise,
  onTest,
  onReset,
  testing,
  testResults,
}: EditorPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <ResizablePanelGroup orientation="vertical" className="flex-1">
        <ResizablePanel defaultSize="60" minSize="25">
          <div className="h-full flex flex-col">
            <div className="shrink-0 flex items-center border-b px-4 py-2">
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
          <OutputPanel testResults={testResults} />
        </ResizablePanel>
      </ResizablePanelGroup>

      <ControlBar
        onTest={onTest}
        onReset={onReset}
        testing={testing}
        hasTestCases={!!exercise && exercise.testCases.length > 0}
      />
    </div>
  );
}
