"use client";

import type { Exercise } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BookOpenIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProblemPanelProps {
  exercise: Exercise | null;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const difficultyVariant: Record<string, string> = {
  easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  hard: "bg-destructive/10 text-destructive border-destructive/20",
};

export function ProblemPanel({ exercise, onPrev, onNext, hasPrev, hasNext }: ProblemPanelProps) {
  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground px-8">
        <div className="flex items-center justify-center size-16 rounded-2xl bg-primary/10">
          <BookOpenIcon className="size-7 text-primary/50" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">No exercise selected</p>
          <p className="text-xs text-muted-foreground mt-1">
            Pick one from the dropdown above to start coding
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-7 shrink-0"
              onClick={onPrev}
              disabled={!hasPrev}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <h2 className="text-lg font-bold leading-tight tracking-tight flex-1">
              {exercise.title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 shrink-0"
              onClick={onNext}
              disabled={!hasNext}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              className={cn("text-[11px] font-medium capitalize", difficultyVariant[exercise.difficulty])}
            >
              {exercise.difficulty}
            </Badge>
            {exercise.type === "multiple-choice" && (
              <Badge variant="outline" className="text-[11px] font-medium border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400">
                Multiple Choice
              </Badge>
            )}
            {exercise.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {exercise.description}
        </p>

        {exercise.type !== "multiple-choice" && exercise.testCases.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Examples
              </h3>
              {exercise.testCases.map((tc, idx) => (
                <Card key={tc.id} size="sm">
                  <CardHeader>
                    <CardTitle className="text-xs">
                      {tc.label || `Example ${idx + 1}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2.5 font-mono text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground font-sans font-semibold uppercase tracking-wider">
                        Input
                      </span>
                      <div className="rounded-md bg-muted px-3 py-2 whitespace-pre-wrap">
                        {tc.input || "(none)"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground font-sans font-semibold uppercase tracking-wider">
                        Output
                      </span>
                      <div className="rounded-md bg-muted px-3 py-2 whitespace-pre-wrap">
                        {tc.expectedOutput}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  );
}
