"use client";

import { Button } from "@/components/ui/button";

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
    <div className="flex items-center gap-2 p-2 border-t bg-background">
      <Button
        size="sm"
        onClick={onRun}
        disabled={running || testing}
        className="gap-1"
      >
        {running ? (
          <svg
            className="animate-spin h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              className="opacity-25"
            />
            <path
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              fill="currentColor"
              className="opacity-75"
            />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
        Run
      </Button>
      {hasTestCases && (
        <Button
          size="sm"
          variant="secondary"
          onClick={onTest}
          disabled={running || testing}
          className="gap-1"
        >
          {testing ? (
            <svg
              className="animate-spin h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                fill="currentColor"
                className="opacity-75"
              />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          Test
        </Button>
      )}
      <Button size="sm" variant="ghost" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}
