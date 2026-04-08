"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FlaskConicalIcon, RotateCcwIcon } from "lucide-react";

interface ControlBarProps {
  onTest: () => void;
  onReset: () => void;
  testing: boolean;
  hasTestCases: boolean;
}

export function ControlBar({
  onTest,
  onReset,
  testing,
  hasTestCases,
}: ControlBarProps) {
  return (
    <div className="shrink-0 flex items-center justify-between border-t px-4 py-2">
      <div className="flex items-center gap-2">
        {hasTestCases && (
          <Button onClick={onTest} disabled={testing}>
            {testing ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <FlaskConicalIcon data-icon="inline-start" />
            )}
            Test
          </Button>
        )}
      </div>
      <Button variant="ghost" onClick={onReset}>
        <RotateCcwIcon data-icon="inline-start" />
        Reset
      </Button>
    </div>
  );
}
