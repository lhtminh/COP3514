"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PlayIcon, CheckIcon, RotateCcwIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ControlBarProps {
  onRun: () => void;
  onTest: () => void;
  onReset: () => void;
  running: boolean;
  testing: boolean;
  hasTestCases: boolean;
}

export function ControlBar({
  onRun,
  onTest,
  onReset,
  running,
  testing,
  hasTestCases,
}: ControlBarProps) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 border-t bg-muted/30">
      <Button size="sm" onClick={onRun} disabled={running || testing}>
        {running ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <PlayIcon data-icon="inline-start" />
        )}
        Run
      </Button>
      {hasTestCases && (
        <Button
          size="sm"
          variant="secondary"
          onClick={onTest}
          disabled={running || testing}
        >
          {testing ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <CheckIcon data-icon="inline-start" />
          )}
          Test
        </Button>
      )}

      <Separator orientation="vertical" className="mx-1 h-4" />

      <Button size="sm" variant="ghost" onClick={onReset}>
        <RotateCcwIcon data-icon="inline-start" />
        Reset
      </Button>
    </div>
  );
}
