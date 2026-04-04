"use client";

import type { Exercise } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

interface ExerciseSelectorProps {
  exercises: Exercise[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const difficultyDot: Record<string, string> = {
  easy: "bg-emerald-500",
  medium: "bg-amber-500",
  hard: "bg-destructive",
};

export function ExerciseSelector({
  exercises,
  selectedId,
  onSelect,
}: ExerciseSelectorProps) {
  const [tagFilter, setTagFilter] = useState<string>("all");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    exercises.forEach((e) => e.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [exercises]);

  const filtered = useMemo(() => {
    if (tagFilter === "all") return exercises;
    return exercises.filter((e) => e.tags.includes(tagFilter));
  }, [exercises, tagFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, Exercise[]>();
    for (const ex of filtered) {
      const key = ex.tags[0] || "uncategorized";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ex);
    }
    return map;
  }, [filtered]);

  const tagButtons = [{ label: "All", value: "all" }, ...allTags.map((t) => ({ label: t, value: t }))];

  return (
    <div className="flex flex-col gap-2.5">
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tagButtons.map(({ label, value }) => (
            <Button
              key={value}
              size="xs"
              variant={tagFilter === value ? "default" : "secondary"}
              onClick={() => setTagFilter(value === tagFilter && value !== "all" ? "all" : value)}
              className="capitalize"
            >
              {label}
            </Button>
          ))}
        </div>
      )}

      <Select
        value={selectedId ?? ""}
        onValueChange={(v) => {
          if (v) onSelect(v);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an exercise...">
            {(value: string) => {
              const ex = exercises.find((e) => e.id === value);
              return ex ? ex.title : "Select an exercise...";
            }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {filtered.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No exercises found
            </div>
          ) : (
            Array.from(grouped.entries()).map(([group, exs]) => (
              <SelectGroup key={group}>
                <SelectLabel className="text-[10px] uppercase tracking-wider">
                  {group}
                </SelectLabel>
                {exs.map((ex) => (
                  <SelectItem key={ex.id} value={ex.id} label={ex.title}>
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "size-1.5 rounded-full shrink-0",
                          difficultyDot[ex.difficulty]
                        )}
                      />
                      <span className="truncate">{ex.title}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
