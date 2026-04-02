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
    <ResizablePanelGroup orientation="vertical" className="h-full">
      <ResizablePanel defaultSize={65} minSize={30}>
        <CodeEditor value={code} onChange={onCodeChange} />
      </ResizablePanel>

      <ControlBar
        onRun={onRun}
        onTest={onTest}
        onReset={onReset}
        running={running}
        testing={testing}
        hasTestCases={!!exercise && exercise.testCases.length > 0}
      />

      <ResizableHandle />

      <ResizablePanel defaultSize={35} minSize={15}>
        <OutputPanel
          output={output}
          testResults={testResults}
          activeTab={outputTab}
          onTabChange={onOutputTabChange}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
