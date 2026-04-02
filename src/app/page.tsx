"use client";

import { useState, useEffect, useCallback } from "react";
import { ExerciseSelector } from "@/components/ExerciseSelector";
import { ProblemPanel } from "@/components/ProblemPanel";
import { EditorPanel } from "@/components/EditorPanel";
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

  const selectedExercise = exercises.find((e) => e.id === selectedId) ?? null;

  useEffect(() => {
    fetch("/api/exercises")
      .then((r) => r.json())
      .then(setExercises)
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
        {/* Left: problem panel */}
        <ResizablePanel defaultSize={35} minSize={20} maxSize={50}>
          <div className="flex flex-col h-full">
            <div className="p-2.5 border-b shrink-0">
              <ExerciseSelector
                exercises={exercises}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
            <div className="flex-1 min-h-0">
              <ProblemPanel exercise={selectedExercise} />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right: editor + output */}
        <ResizablePanel defaultSize={65} minSize={40}>
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
