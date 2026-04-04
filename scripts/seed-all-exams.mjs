// Seed exercises from Midterm 1 2024, and 2026 Exam

const exercises = [
  // =====================================================
  // MIDTERM 1 2024 - MC QUESTIONS
  // =====================================================
  {
    title: "M1'24 Q1: Loop Output Tracing",
    description: "What does this program print? List all numbers on a single line separated by spaces.",
    tags: ["Loops", "Midterm 1 2024"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    for (int i = 1; i <= 20; i++) {
        if (i % 2 != 0 && i % 3 != 0)
            printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
    choices: [
      { id: "A", text: "1 5 7 11 13 17 19" },
      { id: "B", text: "1 3 5 7 9 11 13 15 17 19" },
      { id: "C", text: "2 4 8 10 14 16 20" },
      { id: "D", text: "1 5 7 11 13 17 19 23" },
    ],
    correctAnswer: "A",
  },
  {
    title: "M1'24 Q2: Variable Tracing",
    description: "What are the four values printed by this program?",
    tags: ["Loops", "Midterm 1 2024"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int a = 4, b = 10, c = 2;
    printf("%d ", a);
    c = a + b;
    printf("%d ", c);
    a = c % b;
    printf("%d ", a);
    b = a + c / 7;
    printf("%d\\n", b);
    return 0;
}`,
    choices: [
      { id: "A", text: "4 14 4 6" },
      { id: "B", text: "4 14 4 5" },
      { id: "C", text: "4 12 2 6" },
      { id: "D", text: "2 14 4 6" },
    ],
    correctAnswer: "A",
  },
  {
    title: "M1'24 Q3: Operator Precedence",
    description: "What does this program print?",
    tags: ["Operators", "Midterm 1 2024"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int a = 5, b = 3, c = 10, d = 2;
    int w = a * b;
    int x = w;
    int y = w / a;
    int z = c + d / d;

    printf("%d %d %d %d\\n", w, x, y, z);
    return 0;
}`,
    choices: [
      { id: "A", text: "15 5 3 11" },
      { id: "B", text: "15 15 3 11" },
      { id: "C", text: "15 15 3 12" },
      { id: "D", text: "8 15 3 11" },
    ],
    correctAnswer: "B",
  },
  {
    title: "M1'24 Q4: Nested Loop Pattern",
    description: "What pattern does this program print?",
    tags: ["Loops", "Midterm 1 2024"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int rows[] = {5, 2, 1, 1, 1};
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < rows[i]; j++)
            printf("x");
        printf("\\n");
    }
    return 0;
}`,
    choices: [
      { id: "A", text: "xxxxx\\nxx\\nx\\nx\\nx" },
      { id: "B", text: "x\\nxx\\nxxx\\nxxxx\\nxxxxx" },
      { id: "C", text: "xxxxx\\nxxxx\\nxxx\\nxx\\nx" },
      { id: "D", text: "xxxxx\\nxx\\nxx\\nx\\nx" },
    ],
    correctAnswer: "A",
  },
  {
    title: "M1'24 Q5: Perfect Square Check",
    description: "Which line correctly completes this program to detect if N is a perfect square?",
    tags: ["Control Flow", "Midterm 1 2024"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int N;
    scanf("%d", &N);
    int is_perfect_square = 0;

    for (int i = 1; i * i <= N; i++) {
        /* MISSING LINE */
    }

    if (is_perfect_square)
        printf("%d is a perfect square\\n", N);
    else
        printf("%d is not a perfect square\\n", N);
    return 0;
}`,
    choices: [
      { id: "A", text: "if (i * i == N) { is_perfect_square = 1; }" },
      { id: "B", text: "if (i == N / i) { is_perfect_square = i; }" },
      { id: "C", text: "if (N % i == 0) { is_perfect_square = 1; }" },
      { id: "D", text: "is_perfect_square = (i * i == N);" },
    ],
    correctAnswer: "A",
  },
  {
    title: "M1'24 Q6: Function Call Tracing",
    description: "What value does this program print?",
    tags: ["Functions", "Midterm 1 2024"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int f(int n) {
    if (n == 0) return 0;
    return n + f(n - 1);
}

int main() {
    printf("%d\\n", f(5));
    return 0;
}`,
    choices: [
      { id: "A", text: "10" },
      { id: "B", text: "15" },
      { id: "C", text: "20" },
      { id: "D", text: "5" },
    ],
    correctAnswer: "B",
  },
  {
    title: "M1'24 Q7: Find the Error",
    description: "Which line contains the error that prevents this program from working correctly?",
    tags: ["Debugging", "Midterm 1 2024"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>           // line 1
                              // line 2
int sum(int n) {              // line 3
    int total = 0;            // line 4
    for (int i = 1; i < n; i++)  // line 5
        total += i;           // line 6
    return total;             // line 7
}                             // line 8
                              // line 9
int main() {                  // line 10
    // Should print 15 (1+2+3+4+5)
    printf("%d\\n", sum(5));
    return 0;
}`,
    choices: [
      { id: "A", text: "Line 4 - total should be initialized to 1" },
      { id: "B", text: "Line 5 - condition should be i <= n" },
      { id: "C", text: "Line 6 - should be total = total * i" },
      { id: "D", text: "Line 7 - return should be inside the loop" },
    ],
    correctAnswer: "B",
  },
  {
    title: "M1'24 Q8: Array Counting",
    description: "What does this program print?",
    tags: ["Arrays", "Midterm 1 2024"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int arr[] = {4, 7, 2, 8, 1, 9, 3};
    int count = 0;

    for (int i = 0; i < 7; i++) {
        if (arr[i] > 5)
            count++;
    }
    printf("%d\\n", count);
    return 0;
}`,
    choices: [
      { id: "A", text: "4" },
      { id: "B", text: "3" },
      { id: "C", text: "2" },
      { id: "D", text: "5" },
    ],
    // Elements > 5: 7, 8, 9 = 3
    correctAnswer: "B",
  },

  // =====================================================
  // MIDTERM 1 2024 - CODING QUESTIONS
  // =====================================================
  {
    title: "M1'24 Q11: Swap Case",
    description: "Implement the function swap_case that converts lowercase letters to uppercase and uppercase letters to lowercase. Non-alphabetic characters should be returned unchanged.\n\nFunction signature:\n  char swap_case(char ch);\n\nThe main function reads a single character and prints the result of swap_case.",
    tags: ["Characters", "Midterm 1 2024"],
    difficulty: "easy",
    starterCode: `#include <stdio.h>

char swap_case(char ch);

int main() {
    char ch;
    scanf("%c", &ch);
    printf("%c\\n", swap_case(ch));
    return 0;
}

char swap_case(char ch) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "a", expectedOutput: "A", label: "lowercase to uppercase" },
      { id: "tc2", input: "Z", expectedOutput: "z", label: "uppercase to lowercase" },
      { id: "tc3", input: "5", expectedOutput: "5", label: "non-alphabetic unchanged" },
      { id: "tc4", input: "m", expectedOutput: "M", label: "lowercase m" },
    ],
  },
  {
    title: "M1'24 Q12: Recursive Odd Numbers",
    description: "Implement the recursive function odd_numbers that prints all odd numbers from n down to 1, each on a separate line.\n\nFor n=7, the output should be:\n7\n5\n3\n1\n\nFunction signature:\n  void odd_numbers(int n);",
    tags: ["Recursion", "Midterm 1 2024"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

void odd_numbers(int n);

int main() {
    int n;
    scanf("%d", &n);
    odd_numbers(n);
    return 0;
}

void odd_numbers(int n) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "7", expectedOutput: "7\n5\n3\n1", label: "n=7" },
      { id: "tc2", input: "10", expectedOutput: "9\n7\n5\n3\n1", label: "n=10 (even start)" },
      { id: "tc3", input: "1", expectedOutput: "1", label: "n=1" },
      { id: "tc4", input: "5", expectedOutput: "5\n3\n1", label: "n=5" },
    ],
  },
  {
    title: "M1'24 Q13: Is Doubled Array",
    description: "Implement the function is_doubled that checks whether the second half of an array is a copy of the first half.\n\nReturn 1 if the array is \"doubled\" (first half equals second half), 0 otherwise.\nIf the array has an odd number of elements, return 0.\n\nExamples:\n- {1,2,3,1,2,3} → 1 (doubled)\n- {1,2,3,4,5,6} → 0 (not doubled)\n- {1,2,3} → 0 (odd length)\n\nFunction signature:\n  int is_doubled(int a[], int n);",
    tags: ["Arrays", "Midterm 1 2024"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

int is_doubled(int a[], int n);

int main() {
    int n;
    scanf("%d", &n);
    int a[100];
    for (int i = 0; i < n; i++)
        scanf("%d", &a[i]);
    printf("%d\\n", is_doubled(a, n));
    return 0;
}

int is_doubled(int a[], int n) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "6\n1 2 3 1 2 3", expectedOutput: "1", label: "doubled array" },
      { id: "tc2", input: "6\n1 2 3 4 5 6", expectedOutput: "0", label: "not doubled" },
      { id: "tc3", input: "3\n1 2 3", expectedOutput: "0", label: "odd length" },
      { id: "tc4", input: "4\n5 5 5 5", expectedOutput: "1", label: "all same elements" },
      { id: "tc5", input: "2\n1 1", expectedOutput: "1", label: "two elements, same" },
      { id: "tc6", input: "2\n1 2", expectedOutput: "0", label: "two elements, different" },
    ],
  },
  {
    title: "M1'24 Q14: Letter Frequency Count",
    description: "Read a line of lowercase letters (terminated by newline) and print the count of each letter a-z, space-separated.\n\nYou are given #define N 26. Print exactly 26 numbers: the count of 'a', count of 'b', ..., count of 'z'.\n\nExample: for input \"abcabc\", output is:\n2 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
    tags: ["Arrays", "Characters", "Midterm 1 2024"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

#define N 26

int main() {
    // Your code here: read chars until newline,
    // count frequency of each letter, print counts

    return 0;
}`,
    testCases: [
      { id: "tc1", input: "abcabc", expectedOutput: "2 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", label: "abcabc" },
      { id: "tc2", input: "hello", expectedOutput: "0 0 0 0 1 0 0 1 0 0 0 2 0 0 1 0 0 0 0 0 0 0 0 0 0 0", label: "hello" },
      { id: "tc3", input: "zzz", expectedOutput: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 3", label: "zzz" },
    ],
  },

  // =====================================================
  // 2026 EXAM - MC QUESTIONS
  // =====================================================
  {
    title: "2026 Q1: String Functions Tracing",
    description: "What does this program print?",
    tags: ["Strings", "2026 Exam"],
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
    // strcmp("plank","squat"): 'p' < 's' → negative → < 0 is true
    // strcat(s1, s2): s1 = "planksquat", s2 unchanged = "squat"
    // Output: "planksquat squat"
    correctAnswer: "A",
  },
  {
    title: "2026 Q2: Pointer Arithmetic Expressions",
    description: "Given an array and pointers, what are the three printed values?",
    tags: ["Pointers", "2026 Exam"],
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

    printf("1) %d\\n", *p2 + 20);      // value 1
    printf("2) %d\\n", (int)(p1 - p4)); // value 2
    printf("3) %d\\n", *p1 - *p3);     // value 3
    return 0;
}`,
    choices: [
      { id: "A", text: "1) 50  2) -3  3) -40" },
      { id: "B", text: "1) 50  2) -3  3) -52" },
      { id: "C", text: "1) 50  2) 3  3) -40" },
      { id: "D", text: "1) 40  2) -3  3) -52" },
    ],
    // *p2 = a[2] = 30. 30 + 20 = 50
    // p1 - p4 = 0 - 3 = -3
    // *p1 - *p3 = 10 - 50 = -40
    correctAnswer: "A",
  },
  {
    title: "2026 Q4: Pointer Comparison",
    description: "What does this program print?",
    tags: ["Pointers", "2026 Exam"],
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
    // check: a[0]=1 vs b[2]=1 ✓, a[1]=2 vs b[1]=2 ✓, a[2]=3 vs b[0]=3 ✓ → returns 1
    correctAnswer: "B",
  },
  {
    title: "2026 Q5: Pointer Loop Output",
    description: "What is the output of this program?",
    tags: ["Pointers", "2026 Exam"],
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
    // p starts at a[0]=1, then a[2]=3, a[4]=5, a[6]=7, a[8]=9, a[10]=11
    correctAnswer: "C",
  },
  {
    title: "2026 Q7: Array Bug Identification",
    description: "This function is supposed to print all elements of an array, but it has a bug. Which answer correctly describes the issue?",
    tags: ["Pointers", "Debugging", "2026 Exam"],
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
    tags: ["Pointers", "Functions", "2026 Exam"],
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
    // temp = 5, *p = 3+5 = 8 (a=8), *q = 5 (b=5)
    correctAnswer: "A",
  },
  {
    title: "2026 Q10: Modify Array Tracing",
    description: "What does this program print?",
    tags: ["Pointers", "Arrays", "2026 Exam"],
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
    // 1: odd → 1*2-1=1. 2: even → 1. 3: odd → 5. 4: even → 2. 5: odd → 9. 6: even → 3.
    correctAnswer: "A",
  },

  // =====================================================
  // 2026 EXAM - CODING QUESTIONS
  // =====================================================
  {
    title: "2026 Q3: Vector Multiply (Pointers)",
    description: "Complete the loop that multiplies two vectors element-by-element using pointer arithmetic only.\n\nGiven arrays v1, v2, and v3, each of size n, compute v3[i] = v1[i] * v2[i] for all i.\n\nYou must use pointers p, q, r — no array indexing [].",
    tags: ["Pointers", "Arrays", "2026 Exam"],
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
    tags: ["Strings", "Functions", "2026 Exam"],
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
    tags: ["Pointers", "Arrays", "2026 Exam"],
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
    tags: ["Strings", "Pointers", "2026 Exam"],
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
    tags: ["Pointers", "Arrays", "2026 Exam"],
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
    tags: ["Strings", "Pointers", "2026 Exam"],
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
