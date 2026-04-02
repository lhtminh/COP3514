"use client";

import type { Exercise } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState, useMemo } from "react";

interface ExerciseSelectorProps {
  exercises: Exercise[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

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
    <div className="flex flex-col gap-2">
      {allTags.length > 0 && (
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Filter by tag..."
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="h-7 pl-8 text-xs"
          />
        </div>
      )}
      <Select
        value={selectedId ?? ""}
        onValueChange={(v) => {
          if (v) onSelect(v);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an exercise..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filtered.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">
                No exercises found
              </div>
            ) : (
              filtered.map((ex) => (
                <SelectItem key={ex.id} value={ex.id}>
                  <span className="flex items-center gap-2">
                    <span className="truncate">{ex.title}</span>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {ex.difficulty}
                    </Badge>
                  </span>
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
