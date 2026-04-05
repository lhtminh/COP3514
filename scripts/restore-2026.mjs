import fs from "fs";

const existing = JSON.parse(fs.readFileSync("data/exercises.json", "utf8"));

// These are the 13 exercises that were deleted — re-add them with "Midterm 2" tag instead of "2026 Exam"
const restored = [
  {
    title: "2026 Q1: String Functions Tracing",
    description: "What does this program print?",
    tags: ["Strings", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>
#include <string.h>

int main() {
    char s1[50], s2[50];
    strcpy(s1, "plank");
    strcpy(s2, "squat");

    if (strcmp(s1, s2) < 0) {
        strcat(s1, s2);
    } else {
        strcat(s2, s1);
    }
    printf("%s %s\\n", s1, s2);
    return 0;
}`,
    choices: [
      { id: "A", text: "planksquat squat" },
      { id: "B", text: "plank squatplank" },
      { id: "C", text: "planksquat squatplank" },
      { id: "D", text: "plank planksquat" },
    ],
    correctAnswer: "A",
  },
  {
    title: "2026 Q2: Pointer Arithmetic Expressions",
    description: "Given an array and pointers, what are the three printed values?",
    tags: ["Pointers", "Midterm 2"],
    difficulty: "hard",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int a[] = {10, 20, 30, 40, 50, 60, 70};
    int *p1 = a;
    int *p2 = a + 2;
    int *p3 = a + 4;
    int *p4 = a + 3;

    printf("1) %d\\n", *p2 + 20);
    printf("2) %d\\n", (int)(p1 - p4));
    printf("3) %d\\n", *p1 - *p3);
    return 0;
}`,
    choices: [
      { id: "A", text: "1) 50  2) -3  3) -40" },
      { id: "B", text: "1) 50  2) -3  3) -52" },
      { id: "C", text: "1) 50  2) 3  3) -40" },
      { id: "D", text: "1) 40  2) -3  3) -52" },
    ],
    correctAnswer: "A",
  },
  {
    title: "2026 Q4: Pointer Comparison",
    description: "What does this program print?",
    tags: ["Pointers", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int check(int *a, int *b, int n) {
    for (int i = 0; i < n; i++) {
        if (a[i] != b[n - 1 - i])
            return 0;
    }
    return 1;
}

int main() {
    int x[] = {1, 2, 3};
    int y[] = {3, 2, 1};
    printf("%d\\n", check(x, y, 3));
    return 0;
}`,
    choices: [
      { id: "A", text: "0" },
      { id: "B", text: "1" },
      { id: "C", text: "3" },
      { id: "D", text: "-1" },
    ],
    correctAnswer: "B",
  },
  {
    title: "2026 Q5: Pointer Loop Output",
    description: "What is the output of this program?",
    tags: ["Pointers", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int a[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
    int *p;
    for (p = a; p < a + 12; p += 2)
        printf("%d ", *p);
    printf("\\n");
    return 0;
}`,
    choices: [
      { id: "A", text: "2 4 6 8 10 12" },
      { id: "B", text: "1 2 3 4 5 6" },
      { id: "C", text: "1 3 5 7 9 11" },
      { id: "D", text: "1 4 7 10" },
    ],
    correctAnswer: "C",
  },
  {
    title: "2026 Q7: Array Bug Identification",
    description: "This function is supposed to print all elements of an array, but it has a bug. Which answer correctly describes the issue?",
    tags: ["Pointers", "Debugging", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `void print_array(int *a, int n) {
    int *p;
    for (p = a; p < a + n - 1; p++)
        printf("%d ", *p);
    printf("\\n");
}

// Called with: int arr[] = {10, 20, 30, 40, 50};
// print_array(arr, 5);
// Expected: 10 20 30 40 50
// Actual:   10 20 30 40`,
    choices: [
      { id: "A", text: "Loop should start at p = a + 1" },
      { id: "B", text: "Condition should be p < a + n (not a + n - 1)" },
      { id: "C", text: "printf should use *(p+1) instead of *p" },
      { id: "D", text: "p++ should be p += 2" },
    ],
    correctAnswer: "B",
  },
  {
    title: "2026 Q9: Pointer Swap Analysis",
    description: "What does this program output?",
    tags: ["Pointers", "Functions", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

void mystery(int *p, int *q) {
    int temp = *p;
    *p = *q + *p;
    *q = temp;
}

int main() {
    int a = 5, b = 3;
    mystery(&a, &b);
    printf("%d %d\\n", a, b);
    return 0;
}`,
    choices: [
      { id: "A", text: "8 5" },
      { id: "B", text: "3 5" },
      { id: "C", text: "5 3" },
      { id: "D", text: "8 3" },
    ],
    correctAnswer: "A",
  },
  {
    title: "2026 Q10: Modify Array Tracing",
    description: "What does this program print?",
    tags: ["Pointers", "Arrays", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

void modify(int *a, int n) {
    int *p;
    for (p = a; p < a + n; p++) {
        if (*p % 2 == 0)
            *p = *p / 2;
        else
            *p = *p * 2 - 1;
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5, 6};
    modify(arr, 6);
    for (int i = 0; i < 6; i++)
        printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    choices: [
      { id: "A", text: "1 1 5 2 9 3" },
      { id: "B", text: "0 1 5 2 9 3" },
      { id: "C", text: "1 3 5 7 9 11" },
      { id: "D", text: "2 1 6 2 10 3" },
    ],
    correctAnswer: "A",
  },
  {
    title: "2026 Q3: Vector Multiply (Pointers)",
    description: "Complete the loop that multiplies two vectors element-by-element using pointer arithmetic only.\n\nGiven arrays v1, v2, and v3, each of size n, compute v3[i] = v1[i] * v2[i] for all i.\n\nYou must use pointers p, q, r — no array indexing [].",
    tags: ["Pointers", "Arrays", "Midterm 2"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int v1[100], v2[100], v3[100];
    for (int i = 0; i < n; i++) scanf("%d", &v1[i]);
    for (int i = 0; i < n; i++) scanf("%d", &v2[i]);

    int *p, *q, *r;
    // Use a single for loop with p, q, r to compute v3 = v1 * v2
    // Your code here

    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", v3[i]);
    }
    printf("\\n");
    return 0;
}`,
    testCases: [
      { id: "tc1", input: "3\n1 2 3\n4 5 6", expectedOutput: "4 10 18", label: "Basic multiply" },
      { id: "tc2", input: "4\n2 0 -1 3\n3 5 4 -2", expectedOutput: "6 0 -4 -6", label: "With negatives and zero" },
      { id: "tc3", input: "1\n7\n8", expectedOutput: "56", label: "Single element" },
    ],
  },
  {
    title: "2026 Q8: Command Line Argument Sum",
    description: "Write a program that takes integers as command line arguments and prints their sum.\n\nUse atoi() to convert string arguments to integers. Skip argv[0] (program name).\n\nExample: ./program 10 20 30 → prints: sum is 60\n\nFormat: printf(\"\\tsum is %d\\n\", sum);",
    tags: ["Strings", "Functions", "Midterm 2"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    // Your code here: sum all argv[1] through argv[argc-1]
    // using atoi() to convert strings to integers
    // Print: printf("\\tsum is %d\\n", sum);

    return 0;
}`,
    testCases: [
      { id: "tc1", input: "10 20 30", expectedOutput: "\tsum is 60", label: "Three numbers" },
      { id: "tc2", input: "5", expectedOutput: "\tsum is 5", label: "Single number" },
      { id: "tc3", input: "-1 1", expectedOutput: "\tsum is 0", label: "Negative and positive" },
    ],
  },
  {
    title: "2026 Q11: Largest and Second Largest",
    description: "Implement the function find_top_two that finds the largest and second largest elements in an integer array.\n\nAssume the array has at least 2 elements. The first two elements initialize max and max2 (with max being the larger of the two).\n\nFunction signature:\n  void find_top_two(int arr[], int n, int *largest, int *second_largest);",
    tags: ["Pointers", "Arrays", "Midterm 2"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

void find_top_two(int arr[], int n, int *largest, int *second_largest);

int main() {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    int largest, second_largest;
    find_top_two(arr, n, &largest, &second_largest);
    printf("Largest: %d\\nSecond: %d\\n", largest, second_largest);
    return 0;
}

void find_top_two(int arr[], int n, int *largest, int *second_largest) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "5\n3 7 1 9 5", expectedOutput: "Largest: 9\nSecond: 7", label: "Mixed values" },
      { id: "tc2", input: "3\n10 20 15", expectedOutput: "Largest: 20\nSecond: 15", label: "Three elements" },
      { id: "tc3", input: "4\n-1 -5 -2 -3", expectedOutput: "Largest: -1\nSecond: -2", label: "All negative" },
      { id: "tc4", input: "2\n5 8", expectedOutput: "Largest: 8\nSecond: 5", label: "Two elements" },
    ],
  },
  {
    title: "2026 Q12: Copy Non-Alphabetic Characters",
    description: "Complete the code that copies all non-alphabetic characters from str1 into str2, using pointer arithmetic.\n\nFor example: \"h3llo w0rld!\" → \"30!\"",
    tags: ["Strings", "Pointers", "Midterm 2"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char str1[200], str2[200];
    fgets(str1, sizeof(str1), stdin);
    str1[strcspn(str1, "\\n")] = 0;

    char *p, *q;
    q = str2;
    // Loop through str1 with pointer p
    // If character is NOT alphabetic, copy it to str2 via q
    // Your code here

    *q = '\\0';
    printf("%s\\n", str2);
    return 0;
}`,
    testCases: [
      { id: "tc1", input: "h3llo w0rld!", expectedOutput: "3 0!", label: "Mixed string" },
      { id: "tc2", input: "abc", expectedOutput: "", label: "All alphabetic" },
      { id: "tc3", input: "123!@#", expectedOutput: "123!@#", label: "No letters" },
      { id: "tc4", input: "A1B2C3", expectedOutput: "123", label: "Alternating" },
    ],
  },
  {
    title: "2026 Q13: Test Reverse Arrays",
    description: "Implement the function test_reverse that returns 1 if array b is the reverse of array a, and 0 otherwise. Both arrays have n elements.\n\nUse pointer arithmetic only — no [] operator.\n\nFunction signature:\n  int test_reverse(int *a, int *b, int n);",
    tags: ["Pointers", "Arrays", "Midterm 2"],
    difficulty: "hard",
    starterCode: `#include <stdio.h>

int test_reverse(int *a, int *b, int n);

int main() {
    int n;
    scanf("%d", &n);
    int a[100], b[100];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    for (int i = 0; i < n; i++) scanf("%d", &b[i]);
    printf("%d\\n", test_reverse(a, b, n));
    return 0;
}

int test_reverse(int *a, int *b, int n) {
    // Use pointer arithmetic only
}`,
    testCases: [
      { id: "tc1", input: "3\n1 2 3\n3 2 1", expectedOutput: "1", label: "Reversed" },
      { id: "tc2", input: "3\n1 2 3\n1 2 3", expectedOutput: "0", label: "Same order" },
      { id: "tc3", input: "1\n5\n5", expectedOutput: "1", label: "Single element" },
      { id: "tc4", input: "4\n1 2 2 1\n1 2 2 1", expectedOutput: "1", label: "Palindrome array" },
      { id: "tc5", input: "4\n1 2 3 4\n4 3 2 0", expectedOutput: "0", label: "Almost reversed" },
    ],
  },
  {
    title: "2026 Q14: Weird String Concatenation",
    description: "Implement weird_strcat: given strings s1 and s2, find N = min(strlen(s1), strlen(s2)). Then build result by taking the first N chars of s1, followed by the first N chars of s2.\n\nExamples:\n- s1=\"hello\", s2=\"world\" → \"helloworld\" (N=5)\n- s1=\"hi\", s2=\"world\" → \"hiwo\" (N=2)\n- s1=\"abcde\", s2=\"xy\" → \"abxy\" (N=2)\n\nFunction signature:\n  void weird_strcat(char *s1, char *s2, char *result);",
    tags: ["Strings", "Pointers", "Midterm 2"],
    difficulty: "hard",
    starterCode: `#include <stdio.h>
#include <string.h>

void weird_strcat(char *s1, char *s2, char *result);

int main() {
    char s1[200], s2[200], result[400];
    scanf("%s %s", s1, s2);
    weird_strcat(s1, s2, result);
    printf("%s\\n", result);
    return 0;
}

void weird_strcat(char *s1, char *s2, char *result) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "hello world", expectedOutput: "helloworld", label: "Equal length" },
      { id: "tc2", input: "hi world", expectedOutput: "hiwo", label: "s1 shorter" },
      { id: "tc3", input: "abcde xy", expectedOutput: "abxy", label: "s2 shorter" },
      { id: "tc4", input: "a b", expectedOutput: "ab", label: "Single chars" },
    ],
  },
];

// Generate UUIDs
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

for (const ex of restored) {
  ex.id = uuid();
  existing.push(ex);
}

fs.writeFileSync("data/exercises.json", JSON.stringify(existing, null, 2));
console.log(`Restored ${restored.length} exercises with "Midterm 2" tag`);
console.log("Total exercises:", existing.length);
