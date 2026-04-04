const exercises = [
  {
    title: "Q1: Pointer Arithmetic Values",
    description: "What is the output of this program? Determine the three printed values.",
    tags: ["Pointers", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int a[] = {1, 3, 5, 7, 9, 11};
    int *p = a + 2;
    int *q = a + 5;

    printf("%d\\n", *(p + 1) * (q - p));   // value 1
    printf("%d\\n", (a[1] - *q) + *p);     // value 2
    printf("%d\\n", (*p) * (*q + *a));      // value 3
    return 0;
}`,
    choices: [
      { id: "A", text: "21, -2, 936" },
      { id: "B", text: "63, -2, 936" },
      { id: "C", text: "21, -3, 60" },
      { id: "D", text: "63, -3, 60" },
    ],
    correctAnswer: "B",
  },
  {
    title: "Q2: Pointer Array Tracing",
    description: "What value does this program print?",
    tags: ["Pointers", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main() {
    int a[] = {2, 4, 6, 8, 10};
    int *p;
    int sum = 0;

    for (p = a; p < a + 5; p++)
        if (*p % 4 == 0)
            sum += *p;

    printf("%d\\n", sum - 4);
    return 0;
}`,
    choices: [
      { id: "A", text: "12" },
      { id: "B", text: "4" },
      { id: "C", text: "8" },
      { id: "D", text: "16" },
    ],
    correctAnswer: "C",
  },
  {
    title: "Q3: Command Line Arguments",
    description: "If this program is run with: ./program hello\n\nWhat is the output?",
    tags: ["Strings", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main(int argc, char *argv[]) {
    char *p = argv[1];
    printf("%c", argv[0][1]);
    while (*p != '\\0') {
        printf("%c", *p);
        p++;
    }
    printf("\\n");
    return 0;
}`,
    choices: [
      { id: "A", text: "hello" },
      { id: "B", text: "/hello" },
      { id: "C", text: ".hello" },
      { id: "D", text: "phello" },
    ],
    correctAnswer: "C",
  },
  {
    title: "Q4: String Pointer Manipulation",
    description: "What is the output of this program?",
    tags: ["Strings", "Pointers", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>
#include <string.h>

int main() {
    char s[] = "input.bob";
    char *p = s + strlen(s) - 1;
    char *q = s;

    // Move q to the '.'
    while (*q != '.' && *q != '\\0')
        q++;

    // Print from q+3 backwards to q, then from q to end
    printf("%c%c", *(q+3), *(q+2));
    printf("%s\\n", q);
    return 0;
}`,
    choices: [
      { id: "A", text: "bo.bob" },
      { id: "B", text: "ob.bob" },
      { id: "C", text: "ut.bob" },
      { id: "D", text: "tu.bob" },
    ],
    correctAnswer: "C",
  },
  {
    title: "Q5: String Operations",
    description: "What does this program print given input: coding challenge",
    tags: ["Strings", "Midterm 2"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>
#include <string.h>

int main() {
    char s1[200], s2[200];
    char word1[] = "coding";
    char word2[] = "challenge";

    strcpy(s2, word2);
    strcpy(s1, word1);
    strcat(s2, s1);
    printf("%s%s\\n", s1, s2);
    return 0;
}`,
    choices: [
      { id: "A", text: "codingchallenge" },
      { id: "B", text: "challengecodingcoding" },
      { id: "C", text: "codingchallengecoding" },
      { id: "D", text: "challengecoding" },
    ],
    correctAnswer: "C",
  },
  {
    title: "Q6: Function Return Value",
    description: "What value does this program print?",
    tags: ["Functions", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int mystery(int a, int b) {
    if (a == 0)
        return b;
    return mystery(a - 1, b + 1) + 2;
}

int main() {
    printf("%d\\n", mystery(3, 2));
    return 0;
}`,
    choices: [
      { id: "A", text: "5" },
      { id: "B", text: "8" },
      { id: "C", text: "11" },
      { id: "D", text: "14" },
    ],
    correctAnswer: "C",
  },
  {
    title: "Q7: Pass by Value vs Pointer",
    description: "What does this program print?",
    tags: ["Pointers", "Functions", "Midterm 2"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

void swap(int a, int *b) {
    int temp = a;
    a = *b;
    *b = temp;
}

int main() {
    int x = 3, y = -3;
    swap(x, &y);
    printf("%d %d\\n", x, y);
    return 0;
}`,
    choices: [
      { id: "A", text: "3 3" },
      { id: "B", text: "-3 3" },
      { id: "C", text: "-3 -3" },
      { id: "D", text: "3 -3" },
    ],
    correctAnswer: "B",
  },
  {
    title: "Q8: read_line Function Behavior",
    description: "Which statement correctly describes the behavior of this read_line function?",
    tags: ["Strings", "Functions", "Midterm 2"],
    difficulty: "hard",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `int read_line(char str[], int n) {
    int ch, i = 0;
    while ((ch = getchar()) != '\\n') {
        if (i < n)
            str[i++] = ch;
    }
    str[i] = '\\0';
    return i;
}`,
    choices: [
      { id: "A", text: "It reads at most n characters and discards the rest including newline" },
      { id: "B", text: "It reads at most n characters and stops at newline, keeping newline in buffer" },
      { id: "C", text: "It reads at most n characters into str, discards the rest, and consumes the newline" },
      { id: "D", text: "It reads all characters including newline into str" },
    ],
    correctAnswer: "C",
  },
  {
    title: "Q9: strcmp Comparison",
    description: "Which expression is true (non-zero)?",
    tags: ["Strings", "Midterm 2"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <string.h>

// Given these strings:
char s1[] = "abc";
char s2[] = "abcd";
char s3[] = "abd";

// Which is true?`,
    choices: [
      { id: "A", text: "strcmp(s1, s2) > 0" },
      { id: "B", text: "strcmp(s1, s2) == 0" },
      { id: "C", text: "strcmp(s3, s2) < 0" },
      { id: "D", text: "strcmp(s1, s3) > 0" },
    ],
    correctAnswer: "A",
  },
  {
    title: "Q10: Segmentation Fault",
    description: "At which line does this program cause a segmentation fault?",
    tags: ["Pointers", "Midterm 2"],
    difficulty: "hard",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>   // line 1
#include <stdlib.h>  // line 2
                     // line 3
int main() {         // line 4
    int *p;          // line 5
    int a = 10;      // line 6
    p = &a;          // line 7
    *p = 20;         // line 8 - p points to a, OK
    p = NULL;        // line 9
    *p = 30;         // line 10
    printf("%d\\n", a);
    return 0;
}`,
    choices: [
      { id: "A", text: "Line 5 - uninitialized pointer declaration" },
      { id: "B", text: "Line 8 - dereferencing p to assign 20" },
      { id: "C", text: "Line 10 - dereferencing NULL pointer" },
      { id: "D", text: "No segfault occurs" },
    ],
    correctAnswer: "C",
  },
];

async function seed() {
  for (const ex of exercises) {
    const res = await fetch("http://localhost:3000/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ex),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(`Created: ${data.title}`);
    } else {
      console.error(`Failed: ${ex.title} - ${res.status}`);
    }
  }
}

seed();
