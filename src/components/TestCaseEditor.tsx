"use client";

import type { TestCase } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { PlusIcon, Trash2Icon, FlaskConicalIcon } from "lucide-react";

interface TestCaseEditorProps {
  testCases: TestCase[];
  onChange: (testCases: TestCase[]) => void;
}

export function TestCaseEditor({ testCases, onChange }: TestCaseEditorProps) {
  const addTestCase = () => {
    onChange([
      ...testCases,
      { id: crypto.randomUUID(), input: "", expectedOutput: "", label: "" },
    ]);
  };

  const updateTestCase = (index: number, updates: Partial<TestCase>) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
  };

  const removeTestCase = (index: number) => {
    onChange(testCases.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium flex items-center gap-1.5">
          <FlaskConicalIcon className="size-3.5" />
          Test Cases
        </label>
        <Button type="button" variant="outline" size="sm" onClick={addTestCase}>
          <PlusIcon data-icon="inline-start" />
          Add Test Case
        </Button>
      </div>

      {testCases.length === 0 ? (
        <Card className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">
            No test cases yet. Click &quot;Add Test Case&quot; to create one.
          </p>
        </Card>
      ) : (
        testCases.map((tc, idx) => (
          <Card key={tc.id} className="p-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Test Case {idx + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeTestCase(idx)}
                >
                  <Trash2Icon className="text-destructive" />
                </Button>
              </div>
              <Input
                placeholder="Label (optional)"
                value={tc.label ?? ""}
                onChange={(e) => updateTestCase(idx, { label: e.target.value })}
              />
              <Textarea
                placeholder="Input (stdin)"
                value={tc.input}
                onChange={(e) => updateTestCase(idx, { input: e.target.value })}
                rows={2}
                className="font-mono text-xs"
              />
              <Textarea
                placeholder="Expected output"
                value={tc.expectedOutput}
                onChange={(e) =>
                  updateTestCase(idx, { expectedOutput: e.target.value })
                }
                rows={2}
                className="font-mono text-xs"
              />
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
