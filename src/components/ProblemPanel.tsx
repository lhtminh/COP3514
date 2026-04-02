"use client";

import type { Exercise } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const difficultyColors = {
  easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

interface ProblemPanelProps {
  exercise: Exercise | null;
}

export function ProblemPanel({ exercise }: ProblemPanelProps) {
  if (!exercise) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>Select an exercise to get started</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{exercise.title}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="secondary"
              className={difficultyColors[exercise.difficulty]}
            >
              {exercise.difficulty}
            </Badge>
            {exercise.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {exercise.description}
          </div>
        </div>

        {exercise.testCases.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-semibold mb-2">Examples</h3>
              <div className="space-y-3">
                {exercise.testCases.map((tc, idx) => (
                  <div
                    key={tc.id}
                    className="bg-muted rounded-md p-3 text-sm font-mono"
                  >
                    <div className="text-muted-foreground text-xs mb-1">
                      {tc.label || `Example ${idx + 1}`}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Input: </span>
                      <span className="whitespace-pre-wrap">{tc.input || "(none)"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Output: </span>
                      <span className="whitespace-pre-wrap">
                        {tc.expectedOutput}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  );
}
