"use client";

import type { Exercise } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

interface ExerciseSelectorProps {
  exercises: Exercise[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function ExerciseSelector({
  exercises,
  selectedId,
  onSelect,
}: ExerciseSelectorProps) {
  const [tagFilter, setTagFilter] = useState("");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    exercises.forEach((e) => e.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [exercises]);

  const filtered = useMemo(() => {
    if (!tagFilter) return exercises;
    return exercises.filter((e) =>
      e.tags.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase()))
    );
  }, [exercises, tagFilter]);

  return (
    <div className="space-y-2">
      {allTags.length > 0 && (
        <Input
          placeholder="Filter by tag..."
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="h-8 text-sm"
        />
      )}
      <Select value={selectedId ?? ""} onValueChange={(v) => { if (v) onSelect(v); }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an exercise..." />
        </SelectTrigger>
        <SelectContent>
          {filtered.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground text-center">
              No exercises found
            </div>
          ) : (
            filtered.map((ex) => (
              <SelectItem key={ex.id} value={ex.id}>
                <span className="flex items-center gap-2">
                  <span className="truncate">{ex.title}</span>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${difficultyColors[ex.difficulty]}`}
                  >
                    {ex.difficulty}
                  </Badge>
                </span>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
