// Seed exercises from Midterm 0 2026 (= Midterm 1 2026)

const exercises = [
  // =====================================================
  // MC / TRACE QUESTIONS
  // =====================================================
  {
    title: "M1'26 Q1: Loop with Continue",
    description: "What does this program print?",
    tags: ["Loops", "Midterm 1 2026"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 3; i < 7; i++) {
        if (i % 2 == 0)
            continue;
        sum += i;
    }
    printf("%d\\n", sum);
    return 0;
}`,
    choices: [
      { id: "A", text: "15" },
      { id: "B", text: "8" },
      { id: "C", text: "18" },
      { id: "D", text: "12" },
    ],
    // i=3: odd, sum=3. i=4: even, skip. i=5: odd, sum=8. i=6: even, skip → 8
    correctAnswer: "B",
  },
  {
    title: "M1'26 Q2: Grade Classification",
    description: "What is the output of this program? Each grade is printed in brackets like [A], [B], etc.",
    tags: ["Control Flow", "Midterm 1 2026"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int scores[] = {75, 60, 85, 95, 80, 90, 92};
    for (int i = 0; i < 7; i++) {
        if (scores[i] >= 90)
            printf("[A]");
        else if (scores[i] >= 80)
            printf("[B]");
        else if (scores[i] >= 70)
            printf("[C]");
        else
            printf("[-]");
    }
    printf("\\n");
    return 0;
}`,
    choices: [
      { id: "A", text: "[C][B][-][A][B][A][A]" },
      { id: "B", text: "[C][-][B][A][B][A][A]" },
      { id: "C", text: "[B][-][B][A][C][A][A]" },
      { id: "D", text: "[C][-][A][A][B][A][A]" },
    ],
    // 75→C, 60→-, 85→B, 95→A, 80→B, 90→A, 92→A
    correctAnswer: "B",
  },
  {
    title: "M1'26 Q3: Fibonacci Fill-in",
    description: "Which line correctly fills in the blank to generate the Fibonacci sequence?",
    tags: ["Arrays", "Midterm 1 2026"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int a[20];
    a[0] = 0;
    a[1] = 1;

    for (int i = 2; i < 10; i++) {
        /* MISSING LINE */
    }

    // Should print: 0 1 1 2 3 5 8 13 21 34
    for (int i = 0; i < 10; i++)
        printf("%d ", a[i]);
    return 0;
}`,
    choices: [
      { id: "A", text: "a[i] = a[i-1] + a[i-2];" },
      { id: "B", text: "a[i] = a[i+1] + a[i+2];" },
      { id: "C", text: "a[n] = a[n-1] + a[n-2];" },
      { id: "D", text: "a[i] = a[i-1] * a[i-2];" },
    ],
    correctAnswer: "A",
  },
  {
    title: "M1'26 Q4: Reverse Digit Printing",
    description: "What does this program print?",
    tags: ["Loops", "Midterm 1 2026"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int n = 123456789;
    while (n > 0) {
        printf("%d", n % 10);
        n /= 10;
    }
    printf("\\n");
    return 0;
}`,
    choices: [
      { id: "A", text: "123456789" },
      { id: "B", text: "987654321" },
      { id: "C", text: "9876543210" },
      { id: "D", text: "87654321" },
    ],
    correctAnswer: "B",
  },
  {
    title: "M1'26 Q5: Counting Multiples",
    description: "What does this program print?",
    tags: ["Loops", "Midterm 1 2026"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int count = 0;
    for (int i = 1; i <= 50; i++) {
        if (i % 7 == 0)
            count++;
    }
    printf("%d\\n", count);
    return 0;
}`,
    choices: [
      { id: "A", text: "6" },
      { id: "B", text: "7" },
      { id: "C", text: "8" },
      { id: "D", text: "5" },
    ],
    // 7,14,21,28,35,42,49 = 7 multiples
    correctAnswer: "B",
  },
  {
    title: "M1'26 Q6: Variable Assignment Tracing",
    description: "What four values does this program print?",
    tags: ["Operators", "Midterm 1 2026"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int x = 19, y = 23;
    int a = x + y;
    int b = y;
    int c = a + b;
    printf("%d %d %d %d\\n", a, b, c, a + b);
    return 0;
}`,
    choices: [
      { id: "A", text: "42 23 65 65" },
      { id: "B", text: "42 19 65 61" },
      { id: "C", text: "42 23 65 42" },
      { id: "D", text: "19 23 42 65" },
    ],
    // a=42, b=23, c=65, a+b=65
    correctAnswer: "A",
  },
  {
    title: "M1'26 Q7: Array and Loop Tracing",
    description: "What does this program print?",
    tags: ["Arrays", "Midterm 1 2026"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int a = 3, b = 7, c = 2;
    int x = b - c;
    int y = a + c - 1;
    int z = c;
    int w = y;
    printf("%d %d %d %d\\n", x, y, z, w);
    return 0;
}`,
    choices: [
      { id: "A", text: "5 4 2 4" },
      { id: "B", text: "5 4 2 5" },
      { id: "C", text: "5 5 2 4" },
      { id: "D", text: "4 5 2 4" },
    ],
    // x=7-2=5, y=3+2-1=4, z=2, w=4
    correctAnswer: "A",
  },
  {
    title: "M1'26 Q9: Descending Pair Count",
    description: "What does this program print?",
    tags: ["Arrays", "Midterm 1 2026"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int arr[] = {5, 2, 8, 1, 9, 3, 7};
    int count = 0;
    for (int i = 0; i < 6; i++) {
        if (arr[i] > arr[i + 1])
            count++;
    }
    printf("%d\\n", count);
    return 0;
}`,
    choices: [
      { id: "A", text: "2" },
      { id: "B", text: "3" },
      { id: "C", text: "4" },
      { id: "D", text: "5" },
    ],
    // 5>2✓, 2>8✗, 8>1✓, 1>9✗, 9>3✓, 3>7✗ → 3
    correctAnswer: "B",
  },
  {
    title: "M1'26 Q10: Array Slice Output",
    description: "What does this program print?",
    tags: ["Arrays", "Midterm 1 2026"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int a[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
    for (int i = 5; i <= 10; i++)
        printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
    choices: [
      { id: "A", text: "5 6 7 8 9 10" },
      { id: "B", text: "6 7 8 9 10 11" },
      { id: "C", text: "6 7 8 9 10 11 12" },
      { id: "D", text: "5 6 7 8 9 10 11" },
    ],
    // a[5]=6, a[6]=7, ..., a[10]=11
    correctAnswer: "B",
  },

  // =====================================================
  // CODING QUESTIONS
  // =====================================================
  {
    title: "M1'26 Q8: Reverse Array In-Place",
    description: "Complete the code inside the while loop to reverse an array in-place using two index variables (start and end).\n\nSwap elements at positions start and end, then move inward.\n\nRead n integers, reverse them, and print space-separated.",
    tags: ["Arrays", "Midterm 1 2026"],
    difficulty: "easy",
    starterCode: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int a[100];
    for (int i = 0; i < n; i++)
        scanf("%d", &a[i]);

    int start = 0, end = n - 1;
    while (start < end) {
        // Swap a[start] and a[end], then move inward
        // Your code here
    }

    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", a[i]);
    }
    printf("\\n");
    return 0;
}`,
    testCases: [
      { id: "tc1", input: "5\n1 2 3 4 5", expectedOutput: "5 4 3 2 1", label: "Five elements" },
      { id: "tc2", input: "4\n10 20 30 40", expectedOutput: "40 30 20 10", label: "Four elements" },
      { id: "tc3", input: "1\n42", expectedOutput: "42", label: "Single element" },
      { id: "tc4", input: "6\n1 1 2 2 3 3", expectedOutput: "3 3 2 2 1 1", label: "With duplicates" },
    ],
  },
  {
    title: "M1'26 Q11: Reverse Digits (Recursive)",
    description: "Implement the recursive function reverse_digit that prints the digits of a number in reverse order.\n\nFor example: reverse_digit(12345) prints 54321\n\nHint: use n % 10 to get the last digit, and n / 10 to remove it.\n\nFunction signature:\n  void reverse_digit(long int n);",
    tags: ["Recursion", "Midterm 1 2026"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

void reverse_digit(long int n);

int main() {
    long int n;
    scanf("%ld", &n);
    reverse_digit(n);
    printf("\\n");
    return 0;
}

void reverse_digit(long int n) {
    // Your code here (recursive)
}`,
    testCases: [
      { id: "tc1", input: "12345", expectedOutput: "54321", label: "12345" },
      { id: "tc2", input: "100", expectedOutput: "001", label: "Trailing zeros" },
      { id: "tc3", input: "7", expectedOutput: "7", label: "Single digit" },
      { id: "tc4", input: "9876543210", expectedOutput: "0123456789", label: "Large number" },
    ],
  },
  {
    title: "M1'26 Q12: Swap Case (convert)",
    description: "Implement the function convert that swaps the case of a character:\n- Lowercase → uppercase\n- Uppercase → lowercase\n- Non-alphabetic → unchanged\n\nFunction signature:\n  char convert(char ch);",
    tags: ["Characters", "Midterm 1 2026"],
    difficulty: "easy",
    starterCode: `#include <stdio.h>

char convert(char ch);

int main() {
    char ch;
    scanf("%c", &ch);
    printf("%c\\n", convert(ch));
    return 0;
}

char convert(char ch) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "a", expectedOutput: "A", label: "lower to upper" },
      { id: "tc2", input: "Z", expectedOutput: "z", label: "upper to lower" },
      { id: "tc3", input: "3", expectedOutput: "3", label: "digit unchanged" },
      { id: "tc4", input: "M", expectedOutput: "m", label: "uppercase M" },
      { id: "tc5", input: "!", expectedOutput: "!", label: "special char" },
    ],
  },
  {
    title: "M1'26 Q13: Check Array In Order",
    description: "Implement the function inOrder that returns 1 if the array is sorted in non-decreasing order, and 0 otherwise.\n\nFunction signature:\n  int inOrder(int a[], int n);",
    tags: ["Arrays", "Midterm 1 2026"],
    difficulty: "easy",
    starterCode: `#include <stdio.h>

int inOrder(int a[], int n);

int main() {
    int n;
    scanf("%d", &n);
    int a[100];
    for (int i = 0; i < n; i++)
        scanf("%d", &a[i]);
    printf("%d\\n", inOrder(a, n));
    return 0;
}

int inOrder(int a[], int n) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "5\n1 2 3 4 5", expectedOutput: "1", label: "Sorted ascending" },
      { id: "tc2", input: "5\n5 4 3 2 1", expectedOutput: "0", label: "Sorted descending" },
      { id: "tc3", input: "4\n1 3 2 4", expectedOutput: "0", label: "Out of order" },
      { id: "tc4", input: "4\n2 2 3 3", expectedOutput: "1", label: "With duplicates" },
      { id: "tc5", input: "1\n42", expectedOutput: "1", label: "Single element" },
    ],
  },
  {
    title: "M1'26 Q14: Compute Cross Products Sum",
    description: "Implement the function compute that calculates the sum of all products a1[i]*a2[j] for every pair (i, j).\n\nFor a1={1,2} and a2={3,4,5}:\nsum = 1*3 + 1*4 + 1*5 + 2*3 + 2*4 + 2*5 = 3+4+5+6+8+10 = 36\n\nFunction signature:\n  int compute(int a1[], int s1, int a2[], int s2);",
    tags: ["Arrays", "Midterm 1 2026"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

int compute(int a1[], int s1, int a2[], int s2);

int main() {
    int s1, s2;
    scanf("%d", &s1);
    int a1[100];
    for (int i = 0; i < s1; i++) scanf("%d", &a1[i]);
    scanf("%d", &s2);
    int a2[100];
    for (int i = 0; i < s2; i++) scanf("%d", &a2[i]);
    printf("%d\\n", compute(a1, s1, a2, s2));
    return 0;
}

int compute(int a1[], int s1, int a2[], int s2) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "2\n1 2\n3\n3 4 5", expectedOutput: "36", label: "{1,2} x {3,4,5}" },
      { id: "tc2", input: "3\n1 1 1\n2\n2 3", expectedOutput: "15", label: "All ones times {2,3}" },
      { id: "tc3", input: "1\n5\n1\n3", expectedOutput: "15", label: "Single elements" },
      { id: "tc4", input: "2\n-1 2\n2\n3 4", expectedOutput: "7", label: "With negative" },
    ],
  },
];

async function seed() {
  let created = 0;
  for (const ex of exercises) {
    const res = await fetch("http://localhost:3000/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ex),
    });
    if (res.ok) {
      created++;
      const data = await res.json();
      console.log(`  Created: ${data.title}`);
    } else {
      console.error(`  FAILED: ${ex.title} - ${res.status}`);
    }
  }
  console.log(`\nTotal: ${created}/${exercises.length} exercises created`);
}

seed();
