"use client";

import { ExerciseForm } from "@/components/ExerciseForm";

export default function CreateExercisePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold mb-6">Create Exercise</h1>
      <ExerciseForm mode="create" />
    </div>
  );
}
