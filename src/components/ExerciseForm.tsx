"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Exercise, TestCase } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TestCaseEditor } from "./TestCaseEditor";
import { SaveIcon, XIcon, PlusIcon } from "lucide-react";

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
      const body = {
        title,
        description,
        difficulty,
        tags,
        starterCode,
        testCases,
      };

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      {error && (
        <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Sum of Array"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the problem..."
          rows={6}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Difficulty</label>
        <Select
          value={difficulty}
          onValueChange={(v) => {
            if (v) setDifficulty(v as Exercise["difficulty"]);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
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
            <PlusIcon data-icon="inline-start" />
            Add
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer gap-1"
                onClick={() => removeTag(tag)}
              >
                {tag}
                <XIcon className="size-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Starter Code</label>
        <Textarea
          value={starterCode}
          onChange={(e) => setStarterCode(e.target.value)}
          rows={8}
          className="font-mono text-sm"
        />
      </div>

      <Separator />

      <TestCaseEditor testCases={testCases} onChange={setTestCases} />

      <Separator />

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <SaveIcon data-icon="inline-start" />
          )}
          {saving
            ? "Saving..."
            : mode === "create"
              ? "Create Exercise"
              : "Save Changes"}
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
