"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
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
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [code]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="shrink-0 flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-primary/40" />
            <span className="text-xs font-semibold text-muted-foreground tracking-wide">
              solution.c
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="flex-1 min-h-0">
          <CodeEditor value={code} onChange={onCodeChange} />
        </div>
      </div>

      <ControlBar
        onTest={onTest}
        onReset={onReset}
        testing={testing}
        hasTestCases={!!exercise && exercise.testCases.length > 0}
      />

      <div className="min-h-0 h-[35%]">
        <OutputPanel testResults={testResults} />
      </div>
    </div>
  );
}
