"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ExerciseForm } from "@/components/ExerciseForm";
import type { Exercise } from "@/lib/types";

export default function EditExercisePage() {
  const params = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/exercises/${params.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Exercise not found");
        return r.json();
      })
      .then(setExercise)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto w-full">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="p-6 max-w-4xl mx-auto w-full">
        <p className="text-destructive">{error || "Exercise not found"}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6">Edit Exercise</h1>
      <ExerciseForm exercise={exercise} mode="edit" />
    </div>
  );
}
