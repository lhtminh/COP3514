"use client";

import { CodeEditor } from "./CodeEditor";
import { ControlBar } from "./ControlBar";
import { OutputPanel } from "./OutputPanel";
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
      <div className="flex-1 min-h-0 border-b">
        <CodeEditor value={code} onChange={onCodeChange} />
      </div>
      <ControlBar
        onRun={onRun}
        onTest={onTest}
        onReset={onReset}
        running={running}
        testing={testing}
        hasTestCases={!!exercise && exercise.testCases.length > 0}
      />
      <div className="h-[200px] border-t">
        <OutputPanel
          output={output}
          testResults={testResults}
          activeTab={outputTab}
          onTabChange={onOutputTabChange}
        />
      </div>
    </div>
  );
}
