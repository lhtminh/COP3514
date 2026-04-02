"use client";

import type { Exercise } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BookOpenIcon } from "lucide-react";

interface ProblemPanelProps {
  exercise: Exercise | null;
}

export function ProblemPanel({ exercise }: ProblemPanelProps) {
  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground px-8">
        <BookOpenIcon className="size-10 opacity-20" />
        <p className="text-sm text-center">
          Select an exercise to get started
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold leading-tight">
            {exercise.title}
          </h2>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="secondary" className="text-[10px]">
              {exercise.difficulty}
            </Badge>
            {exercise.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-foreground/90">
          {exercise.description}
        </div>

        {exercise.testCases.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Examples
              </h3>
              {exercise.testCases.map((tc, idx) => (
                <div
                  key={tc.id}
                  className="rounded-lg bg-muted/60 p-3 font-mono text-xs"
                >
                  <div className="text-muted-foreground text-[10px] font-sans font-medium mb-1.5">
                    {tc.label || `Example ${idx + 1}`}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div>
                      <span className="text-muted-foreground select-none">
                        Input:{" "}
                      </span>
                      <span className="whitespace-pre-wrap">
                        {tc.input || "(none)"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground select-none">
                        Output:{" "}
                      </span>
                      <span className="whitespace-pre-wrap">
                        {tc.expectedOutput}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  );
}
