"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Exercise } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  BookOpenIcon,
  FlaskConicalIcon,
} from "lucide-react";

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
        <div>
          <h1 className="text-xl font-bold">Exercises</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your C programming exercises
          </p>
        </div>
        <Link href="/exercises/create">
          <Button>
            <PlusIcon data-icon="inline-start" />
            New Exercise
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : exercises.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 gap-3">
            <BookOpenIcon className="size-10 text-muted-foreground/30" />
            <CardDescription>
              No exercises yet. Create your first one!
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {exercises.map((ex) => (
            <Card key={ex.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-sm">{ex.title}</CardTitle>
                      <Badge variant="secondary" className="text-[10px]">
                        {ex.difficulty}
                      </Badge>
                    </div>
                    {ex.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {ex.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[10px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Link href={`/exercises/${ex.id}/edit`}>
                      <Button variant="ghost" size="icon-sm">
                        <PencilIcon />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(ex.id)}
                    >
                      <Trash2Icon className="text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="line-clamp-2 text-xs">
                  {ex.description || "No description"}
                </CardDescription>
                <Separator className="my-2" />
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <FlaskConicalIcon className="size-3" />
                  {ex.testCases.length} test case
                  {ex.testCases.length !== 1 ? "s" : ""}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
