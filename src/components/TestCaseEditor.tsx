"use client";

import type { TestCase } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Test Cases</label>
        <Button type="button" variant="outline" size="sm" onClick={addTestCase}>
          + Add Test Case
        </Button>
      </div>
      {testCases.map((tc, idx) => (
        <div key={tc.id} className="border rounded-md p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Test Case {idx + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeTestCase(idx)}
              className="h-6 px-2 text-destructive hover:text-destructive"
            >
              Remove
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
            className="font-mono text-sm"
          />
          <Textarea
            placeholder="Expected output"
            value={tc.expectedOutput}
            onChange={(e) =>
              updateTestCase(idx, { expectedOutput: e.target.value })
            }
            rows={2}
            className="font-mono text-sm"
          />
        </div>
      ))}
      {testCases.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No test cases yet. Click &quot;Add Test Case&quot; to create one.
        </p>
      )}
    </div>
  );
}
