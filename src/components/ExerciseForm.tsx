"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Exercise, TestCase } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TestCaseEditor } from "./TestCaseEditor";

interface ExerciseFormProps {
  exercise?: Exercise;
  mode: "create" | "edit";
}

const DEFAULT_STARTER = `#include <stdio.h>

int main() {
    // Your code here

    return 0;
}`;

export function ExerciseForm({ exercise, mode }: ExerciseFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(exercise?.title ?? "");
  const [description, setDescription] = useState(exercise?.description ?? "");
  const [difficulty, setDifficulty] = useState<Exercise["difficulty"]>(
    exercise?.difficulty ?? "easy"
  );
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(exercise?.tags ?? []);
  const [starterCode, setStarterCode] = useState(
    exercise?.starterCode ?? DEFAULT_STARTER
  );
  const [testCases, setTestCases] = useState<TestCase[]>(
    exercise?.testCases ?? []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const body = { title, description, difficulty, tags, starterCode, testCases };

      if (mode === "create") {
        const res = await fetch("/api/exercises", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Failed to create exercise");
      } else {
        const res = await fetch(`/api/exercises/${exercise!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Failed to update exercise");
      }

      router.push("/exercises");
      router.refresh();
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Sum of Array"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the problem..."
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Difficulty</label>
        <Select value={difficulty} onValueChange={(v) => { if (v) setDifficulty(v as Exercise["difficulty"]); }}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addTag}>
            Add
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/20"
                onClick={() => removeTag(tag)}
              >
                {tag} &times;
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Starter Code</label>
        <Textarea
          value={starterCode}
          onChange={(e) => setStarterCode(e.target.value)}
          rows={8}
          className="font-mono text-sm"
        />
      </div>

      <TestCaseEditor testCases={testCases} onChange={setTestCases} />

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : mode === "create" ? "Create Exercise" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/exercises")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
