export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  label?: string;
}

export interface Choice {
  id: string;
  text: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  type?: "coding" | "multiple-choice";
  starterCode: string;
  testCases: TestCase[];
  codeSnippet?: string;
  choices?: Choice[];
  correctAnswer?: string;
}

export interface ExerciseProgress {
  exerciseId: string;
  code: string;
  solved: boolean;
  lastAttemptAt: string;
}

export interface Material {
  id: string;
  filename: string;
  type: "pdf" | "pptx";
  uploadedAt: string;
  filePath: string;
}

export interface CompileResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut?: boolean;
}

export interface TestResult {
  testCaseId: string;
  label?: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  stderr: string;
  exitCode: number | null;
  timedOut?: boolean;
}
