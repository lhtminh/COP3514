"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { PlayIcon, FlaskConicalIcon, RotateCcwIcon } from "lucide-react";

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
    <div className="shrink-0 flex items-center justify-between border-t bg-card px-4 py-2">
      <div className="flex items-center gap-2">
        <Button onClick={onRun} disabled={running || testing}>
          {running ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <PlayIcon data-icon="inline-start" />
          )}
          Run
        </Button>
        {hasTestCases && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="outline"
              onClick={onTest}
              disabled={running || testing}
            >
              {testing ? (
                <Spinner data-icon="inline-start" />
              ) : (
                <FlaskConicalIcon data-icon="inline-start" />
              )}
              Test
            </Button>
          </>
        )}
      </div>
      <Button variant="ghost" onClick={onReset}>
        <RotateCcwIcon data-icon="inline-start" />
        Reset
      </Button>
    </div>
  );
}
