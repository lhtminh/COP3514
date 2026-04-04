"use client";

import { useState, useEffect, useCallback } from "react";
import { ExerciseSelector } from "@/components/ExerciseSelector";
import { ProblemPanel } from "@/components/ProblemPanel";
import { EditorPanel } from "@/components/EditorPanel";
import { MCPanel } from "@/components/MCPanel";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import type { Exercise, CompileResult, TestResult } from "@/lib/types";

const DEFAULT_CODE = `#include <stdio.h>

int main() {
    // Your code here

    return 0;
}`;

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<CompileResult | null>(null);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [running, setRunning] = useState(false);
  const [testing, setTesting] = useState(false);
  const [outputTab, setOutputTab] = useState("output");

  const selectedIndex = exercises.findIndex((e) => e.id === selectedId);
  const selectedExercise = selectedIndex >= 0 ? exercises[selectedIndex] : null;

  useEffect(() => {
    fetch("/api/exercises")
      .then((r) => r.json())
      .then((data: Exercise[]) => {
        setExercises(data);
        if (!selectedId && data.length > 0) {
          setSelectedId(data[0].id);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const exercise = exercises.find((e) => e.id === selectedId);
    if (!exercise) return;

    fetch(`/api/progress/${selectedId}`)
      .then((r) => r.json())
      .then((progress) => {
        if (progress.code) {
          setCode(progress.code);
        } else {
          setCode(exercise.starterCode || DEFAULT_CODE);
        }
      })
      .catch(() => {
        setCode(exercise.starterCode || DEFAULT_CODE);
      });

    setOutput(null);
    setTestResults(null);
    setOutputTab("output");
  }, [selectedId, exercises]);

  useEffect(() => {
    if (!selectedId) return;
    const timer = setTimeout(() => {
      fetch(`/api/progress/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      }).catch(console.error);
    }, 1000);
    return () => clearTimeout(timer);
  }, [code, selectedId]);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setOutputTab("output");
    try {
      const res = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await res.json();
      setOutput(result);
    } catch (error) {
      setOutput({ stdout: "", stderr: `Error: ${error}`, exitCode: 1 });
    } finally {
      setRunning(false);
    }
  }, [code]);

  const handleTest = useCallback(async () => {
    if (!selectedExercise) return;
    setTesting(true);
    setOutputTab("tests");
    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          testCases: selectedExercise.testCases,
        }),
      });
      const result = await res.json();
      setTestResults(result.results);

      if (result.allPassed && selectedId) {
        fetch(`/api/progress/${selectedId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, solved: true }),
        }).catch(console.error);
      }
    } catch (error) {
      setTestResults([]);
      setOutput({ stdout: "", stderr: `Error: ${error}`, exitCode: 1 });
      setOutputTab("output");
    } finally {
      setTesting(false);
    }
  }, [code, selectedExercise, selectedId]);

  const handleReset = useCallback(() => {
    setCode(selectedExercise?.starterCode || DEFAULT_CODE);
    setOutput(null);
    setTestResults(null);
  }, [selectedExercise]);

  return (
    <div className="flex-1 overflow-hidden">
      <ResizablePanelGroup orientation="horizontal" className="h-full">
        <ResizablePanel defaultSize="38" minSize="25" maxSize="50">
          <div className="h-full p-2 pr-1">
            <div className="flex flex-col h-full rounded-xl border overflow-hidden bg-card">
              <div className="shrink-0 border-b px-4 py-3">
                <ExerciseSelector
                  exercises={exercises}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>
              <div className="flex-1 min-h-0">
                <ProblemPanel
                  exercise={selectedExercise}
                  hasPrev={selectedIndex > 0}
                  hasNext={selectedIndex < exercises.length - 1}
                  onPrev={() => selectedIndex > 0 && setSelectedId(exercises[selectedIndex - 1].id)}
                  onNext={() => selectedIndex < exercises.length - 1 && setSelectedId(exercises[selectedIndex + 1].id)}
                />
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize="62" minSize="35">
          <div className="h-full p-2 pl-1">
            <div className="h-full rounded-xl border overflow-hidden bg-card">
              {selectedExercise?.type === "multiple-choice" ? (
                <MCPanel
                  key={selectedExercise.id}
                  exercise={selectedExercise}
                  onSolved={() => {
                    if (selectedId) {
                      fetch(`/api/progress/${selectedId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ code: "", solved: true }),
                      }).catch(console.error);
                    }
                  }}
                />
              ) : (
                <EditorPanel
                  code={code}
                  onCodeChange={setCode}
                  exercise={selectedExercise}
                  onRun={handleRun}
                  onTest={handleTest}
                  onReset={handleReset}
                  running={running}
                  testing={testing}
                  output={output}
                  testResults={testResults}
                  outputTab={outputTab}
                  onOutputTabChange={setOutputTab}
                />
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
