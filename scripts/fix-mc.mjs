import fs from "fs";

const file = "data/exercises.json";
const exercises = JSON.parse(fs.readFileSync(file, "utf-8"));

const fixes = {
  "Q1: Pointer Arithmetic Values": {
    correctAnswer: "C",
    // Code produces 21, -3, 60 which is choice C
  },
  "Q3: Command Line Arguments": {
    description:
      "If this program is compiled as a.out and run with:\n./a.out hello\n\nWhat is the output? (Hint: argv[0] is the program name)",
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
    // ./a.out → argv[0] = "./a.out", argv[0][1] = '/' → "/hello" = B
    // Hmm, still '/'. For '.' we need argv[0] = "a.out", argv[0][1] = '.'
    // On many systems running ./a.out stores "./a.out" as argv[0].
    // Let me change to just "a.out hello" to get argv[0] = "a.out"
    correctAnswer: "C",
  },
  "Q4: String Pointer Manipulation": {
    codeSnippet: `#include <stdio.h>
#include <string.h>

int main() {
    char s[] = "input.bob";
    char *q = s;

    // Move q to the '.'
    while (*q != '.' && *q != '\\0')
        q++;

    // Print two chars before the dot, then from dot onward
    printf("%c%c", *(q-1), *(q-2));
    printf("%s\\n", q);
    return 0;
}`,
    choices: [
      { id: "A", text: "tp.bob" },
      { id: "B", text: "tu.bob" },
      { id: "C", text: "ut.bob" },
      { id: "D", text: "pt.bob" },
    ],
    // q points to s[5] = '.', q-1 = s[4] = 't', q-2 = s[3] = 'u'
    // prints "tu" then ".bob" → "tu.bob" = B? No wait:
    // *(q-1) = 't', *(q-2) = 'u' → prints "tu.bob"
    // Hmm but rubric says "ut.bob". Let me swap: *(q-2), *(q-1)
    correctAnswer: "C",
  },
  "Q7: Pass by Value vs Pointer": {
    correctAnswer: "A",
    // swap(x, &y): a=3(copy), b=&y. temp=3, a=-3(local), *b=3(y=3).
    // Back in main: x=3, y=3 → "3 3" = A
  },
  "Q9: strcmp Comparison": {
    choices: [
      { id: "A", text: "strcmp(s3, s2) > 0" },
      { id: "B", text: "strcmp(s1, s2) == 0" },
      { id: "C", text: "strcmp(s1, s3) > 0" },
      { id: "D", text: "strcmp(s2, s3) > 0" },
    ],
    // s1="abc", s2="abcd", s3="abd"
    // strcmp(s3, s2) = "abd" vs "abcd" → 'd' > 'c' → positive → > 0 is TRUE = A ✓
    correctAnswer: "A",
  },
  "Q10: Segmentation Fault": {
    codeSnippet: `#include <stdio.h>   // line 1
#include <stdlib.h>  // line 2
                     // line 3
int main() {         // line 4
    int *p;          // line 5
    int a = 10;      // line 6
    p = NULL;        // line 7
    *p = 20;         // line 8
    p = &a;          // line 9
    *p = 30;         // line 10
    printf("%d\\n", a);
    return 0;
}`,
    choices: [
      { id: "A", text: "Line 5 - uninitialized pointer declaration" },
      { id: "B", text: "Line 8 - dereferencing NULL pointer" },
      { id: "C", text: "Line 10 - dereferencing p after reassignment" },
      { id: "D", text: "No segfault occurs" },
    ],
    // p = NULL at line 7, *p = 20 at line 8 → SEGFAULT at line 8
    correctAnswer: "B",
  },
};

// Also fix Q3 description and Q4 code
fixes["Q3: Command Line Arguments"].description =
  "If this program is run as:  a.out hello\n\n(where argv[0] = \"a.out\")\n\nWhat is the output?";

// Fix Q4: make it print *(q-2) then *(q-1) to get "ut.bob"
fixes["Q4: String Pointer Manipulation"].codeSnippet = `#include <stdio.h>
#include <string.h>

int main() {
    char s[] = "input.bob";
    char *q = s;

    // Move q to the '.'
    while (*q != '.' && *q != '\\0')
        q++;

    // Print two chars before the dot, then from dot onward
    printf("%c%c", *(q-2), *(q-1));
    printf("%s\\n", q);
    return 0;
}`;
fixes["Q4: String Pointer Manipulation"].choices = [
  { id: "A", text: "tp.bob" },
  { id: "B", text: "pt.bob" },
  { id: "C", text: "ut.bob" },
  { id: "D", text: "tu.bob" },
];
// q = s[5] = '.', *(q-2) = s[3] = 'u', *(q-1) = s[4] = 't'
// prints "ut" then ".bob" → "ut.bob" = C ✓

let updated = 0;
for (const ex of exercises) {
  if (fixes[ex.title]) {
    Object.assign(ex, fixes[ex.title]);
    updated++;
    console.log(`Fixed: ${ex.title}`);
  }
}

fs.writeFileSync(file, JSON.stringify(exercises, null, 2));
console.log(`\nUpdated ${updated} exercises`);
