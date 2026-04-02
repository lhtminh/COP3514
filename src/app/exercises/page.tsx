"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Exercise } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const difficultyColors = {
  easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exercises")
      .then((r) => r.json())
      .then(setExercises)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this exercise?")) return;
    await fetch(`/api/exercises/${id}`, { method: "DELETE" });
    setExercises((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Exercises</h1>
        <Link href="/exercises/create">
          <Button>+ New Exercise</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : exercises.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <p>No exercises yet. Create your first one!</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {exercises.map((ex) => (
            <Card key={ex.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{ex.title}</h3>
                    <Badge
                      variant="secondary"
                      className={difficultyColors[ex.difficulty]}
                    >
                      {ex.difficulty}
                    </Badge>
                  </div>
                  {ex.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {ex.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {ex.description || "No description"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ex.testCases.length} test case{ex.testCases.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/exercises/${ex.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(ex.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
