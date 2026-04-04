"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  CheckCircle2Icon,
  XCircleIcon,
  SendIcon,
  RotateCcwIcon,
} from "lucide-react";
import { CodeViewer } from "./CodeViewer";

interface MCPanelProps {
  exercise: Exercise;
  onSolved?: () => void;
}

export function MCPanel({ exercise, onSolved }: MCPanelProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = submitted && selected === exercise.correctAnswer;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    if (selected === exercise.correctAnswer) {
      onSolved?.();
    }
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 flex items-center border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="size-2.5 rounded-full bg-primary/40" />
          <span className="text-xs font-semibold text-muted-foreground tracking-wide">
            Trace the Code
          </span>
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-4 p-5">
          {exercise.codeSnippet && (
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Code
              </h3>
              <CodeViewer code={exercise.codeSnippet} />
            </div>
          )}

          <Separator />

          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Choose your answer
            </h3>
            <div className="flex flex-col gap-2">
              {exercise.choices?.map((choice) => {
                const isThis = selected === choice.id;
                const showCorrect =
                  submitted && choice.id === exercise.correctAnswer;
                const showWrong = submitted && isThis && !isCorrect;

                return (
                  <button
                    key={choice.id}
                    onClick={() => {
                      if (!submitted) setSelected(choice.id);
                    }}
                    disabled={submitted}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                      !submitted &&
                        !isThis &&
                        "hover:bg-accent hover:border-accent-foreground/20 cursor-pointer",
                      !submitted &&
                        isThis &&
                        "border-primary bg-primary/5 ring-1 ring-primary/30",
                      showCorrect &&
                        "border-emerald-500 bg-emerald-500/10",
                      showWrong &&
                        "border-destructive bg-destructive/10",
                      submitted &&
                        !showCorrect &&
                        !showWrong &&
                        "opacity-50"
                    )}
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        "shrink-0 mt-0.5 size-6 justify-center font-semibold",
                        !submitted && isThis && "border-primary text-primary",
                        showCorrect &&
                          "border-emerald-500 text-emerald-600 dark:text-emerald-400",
                        showWrong &&
                          "border-destructive text-destructive"
                      )}
                    >
                      {choice.id}
                    </Badge>
                    <span className="flex-1 font-mono whitespace-pre-wrap">
                      {choice.text}
                    </span>
                    {showCorrect && (
                      <CheckCircle2Icon className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {showWrong && (
                      <XCircleIcon className="size-4 text-destructive shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {submitted && (
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium",
                isCorrect
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "border-destructive/20 bg-destructive/10 text-destructive"
              )}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2Icon className="size-4" />
                  Correct!
                </>
              ) : (
                <>
                  <XCircleIcon className="size-4" />
                  Incorrect. The correct answer is{" "}
                  {exercise.correctAnswer}.
                </>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="shrink-0 flex items-center justify-between border-t px-4 py-2">
        <Button onClick={handleSubmit} disabled={!selected || submitted}>
          <SendIcon data-icon="inline-start" />
          Submit
        </Button>
        <Button variant="ghost" onClick={handleReset}>
          <RotateCcwIcon data-icon="inline-start" />
          Reset
        </Button>
      </div>
    </div>
  );
}
