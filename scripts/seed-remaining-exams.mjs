// Seed remaining questions from Final Spring 2025 (Q3, Q10, Q17)
// and Final Fall 2024 (Q2, Q10)

const newMCExercises = [
  // Spring 2025 Q3: fscanf format string for employee data
  {
    title: "F'25 Q3: fscanf Format String",
    description:
      "Suppose you have just opened an employee data file for temporary workers with the following data formats:\n\n```\nMary 25.3 14.0\nMike 30.0 35.5\nJohn 18.4 65.0\n```\n\nThe first field is the employee first name (assume the first name is one word), the second is the hourly rate, and the third is the number of hours.\n\nThe function prototype of `fscanf` is:\n```c\nint fscanf(FILE* pFile, char *format, ... )\n// ... indicates variables to read into\n```\n\nAssume the file has been opened and `pFile` is the FILE pointer variable. The following variables have been declared:\n```c\nchar name[31];\ndouble rate;\ndouble num_hours;\n```\n\nWhich statement correctly reads a row of data?",
    tags: ["File I/O", "Final Spring 2025"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `// Data format:
// Mary 25.3 14.0
// Mike 30.0 35.5
// John 18.4 65.0

// Variables:
char name[31];
double rate;
double num_hours;`,
    choices: [
      { id: "A", text: 'fscanf(pFile, "%s %lf %lf", name, &rate, &num_hours);' },
      { id: "B", text: 'fscanf(pFile, "%s %f %f", name, &rate, &num_hours);' },
      { id: "C", text: 'fscanf(pFile, "%s %lf %lf", &name, &rate, &num_hours);' },
      { id: "D", text: 'fscanf(pFile, "%s %d %d", name, &rate, &num_hours);' },
    ],
    // %s for string (no &), %lf for double (with &)
    // B: %f is for float, not double in scanf
    // C: &name is wrong for char array
    // D: %d is for int, not double
    correctAnswer: "A",
  },
  // Spring 2025 Q10: min_in_range function pointer with cosine
  {
    title: "F'25 Q10: Function Pointer with min_in_range",
    description:
      "Consider the function below and the prototype of the cosine function, which returns the cosine of x:\n```c\ndouble cos(double x);\n```\n\nWhich of the following statements will find the value in the range from 0 to 6 with minimum cosine value using the `min_in_range` function?",
    tags: ["Functions", "Pointers", "Final Spring 2025"],
    difficulty: "hard",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `double min_in_range(double (*f)(double), double a, double b,
                     double step) {
    double res = b;
    for (double x = a; x < b; x += step)
        if (f(x) < f(res))
            res = x;
    return res;
}

// Prototype: double cos(double x);`,
    choices: [
      { id: "A", text: "result = min_in_range(0.0, 6.0, 0.0001);" },
      { id: "B", text: "result = min_in_range(cos(x), 0.0, 6.0, 0.0001);" },
      { id: "C", text: "result = min_in_range(cos(0.0, 6.0, 0.0001));" },
      { id: "D", text: "result = min_in_range(cos, 0.0, 6.0, 0.0001);" },
    ],
    // A: missing function pointer argument (only 3 args)
    // B: cos(x) evaluates to double, not a function pointer
    // C: cos takes 1 argument, not 3
    // D: cos is the function name = correct function pointer syntax
    correctAnswer: "D",
  },
];

const newCodingExercises = [
  // Spring 2025 Q17: Read integers, print primes
  {
    title: "F'25 Q17: Print Prime Numbers",
    description:
      "Complete the program to read integers from input and display only the prime numbers.\n\nThe `is_prime` function is provided for checking if a number is a prime number.\n\nRead integers using `scanf` until it fails (returns != 1). For each prime integer, print it followed by a space. Print a newline at the end.\n\n**Original exam context:** The exam version reads from a file `numbers.txt` using `fscanf` with `feof`/`ferror` checks. This exercise adapts it to use stdin.",
    tags: ["File I/O", "Functions", "Final Spring 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

int is_prime(int n);

int main() {
    int num;

    // Read integers from input and print the prime ones
    // Each prime followed by a space, then a newline at the end
    // Your code here

    return 0;
}

int is_prime(int n) {
    int divisor;
    if (n <= 1)
        return 0;
    for (divisor = 2; divisor * divisor <= n; divisor++)
        if (n % divisor == 0)
            return 0;
    return 1;
}`,
    testCases: [
      { id: "tc1", input: "5 10 34 1 32 3 4", expectedOutput: "5 3", label: "Mixed primes and non-primes" },
      { id: "tc2", input: "2 3 5 7 11", expectedOutput: "2 3 5 7 11", label: "All primes" },
      { id: "tc3", input: "4 6 8 9 10", expectedOutput: "", label: "No primes" },
      { id: "tc4", input: "1 2", expectedOutput: "2", label: "1 is not prime" },
      { id: "tc5", input: "17", expectedOutput: "17", label: "Single prime" },
    ],
  },
  // Fall 2024 Q2: Delete second node of linked list
  {
    title: "F'24 Q2: Delete Second Node",
    description:
      "Complete the function `delete_second` to delete the second node of a linked list. The function returns a pointer to the head of the linked list.\n\nNote that the linked list could contain any number of nodes. The guard clause for empty/single-node lists is already provided.\n\nFill in the missing statements to:\n1. Save a pointer to the second node in `temp`\n2. Make the first node skip over the second node\n3. Free the second node's memory\n4. Return the head of the list",
    tags: ["Linked Lists", "Dynamic Memory", "Final 2024"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

struct node *delete_second(struct node *list);

struct node *build_list(int n) {
    struct node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        struct node *nd = malloc(sizeof(struct node));
        nd->value = v;
        nd->next = NULL;
        if (!head) head = nd;
        else tail->next = nd;
        tail = nd;
    }
    return head;
}

void print_list(struct node *list) {
    int first = 1;
    while (list) {
        if (!first) printf(" ");
        printf("%d", list->value);
        first = 0;
        list = list->next;
    }
    printf("\\n");
}

int main() {
    int n;
    scanf("%d", &n);
    struct node *list = build_list(n);
    list = delete_second(list);
    print_list(list);
    return 0;
}

struct node *delete_second(struct node *list) {
    struct node *temp;

    if (list == NULL || list->next == NULL) {
        return list;
    }

    // Missing statements:
    // 1. temp = ? (save pointer to second node)
    // 2. Bypass the second node
    // 3. Free the second node
    // 4. Return head
}`,
    testCases: [
      { id: "tc1", input: "3\n2 3 5", expectedOutput: "2 5", label: "Delete from 3-node list" },
      { id: "tc2", input: "2\n2 3", expectedOutput: "2", label: "Delete from 2-node list" },
      { id: "tc3", input: "1\n5", expectedOutput: "5", label: "Single node - unchanged" },
      { id: "tc4", input: "4\n10 20 30 40", expectedOutput: "10 30 40", label: "Delete from 4-node list" },
      { id: "tc5", input: "5\n1 2 3 4 5", expectedOutput: "1 3 4 5", label: "Delete from 5-node list" },
    ],
  },
  // Fall 2024 Q10: Read integers, sort with qsort, print sorted
  {
    title: "F'24 Q10: Sort Integers with qsort",
    description:
      "Complete the program that reads positive integers from the user until 0 is entered, sorts them using `qsort`, and prints the sorted integers each on a separate line.\n\nThe `int_cmp` compare function is provided. Assume the user will not enter more than 100 numbers. Do NOT store the 0.\n\nYou need to:\n1. Read positive integers until 0 is entered\n2. Call `qsort` to sort the array\n3. Print each sorted integer on its own line\n\n**Original exam context:** The exam version writes sorted integers to a file using `fprintf`. This exercise uses stdout instead.",
    tags: ["Arrays", "Sorting", "Final 2024"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

int int_cmp(const void *p, const void *q);

int main() {
    int numbers[100];
    int count = 0;

    // 1. Read positive integers until 0 is entered (don't store 0)
    // 2. Sort using qsort
    // 3. Print each sorted integer on its own line
    // Your code here

    return 0;
}

int int_cmp(const void *p, const void *q) {
    return *(int *)p - *(int *)q;
}`,
    testCases: [
      { id: "tc1", input: "5 3 1 4 2 0", expectedOutput: "1\n2\n3\n4\n5", label: "5 unsorted integers" },
      { id: "tc2", input: "10 0", expectedOutput: "10", label: "Single integer" },
      { id: "tc3", input: "3 1 2 0", expectedOutput: "1\n2\n3", label: "3 integers" },
      { id: "tc4", input: "100 50 75 25 0", expectedOutput: "25\n50\n75\n100", label: "Larger numbers" },
      { id: "tc5", input: "1 1 2 1 0", expectedOutput: "1\n1\n1\n2", label: "Duplicates" },
    ],
  },
];

async function seed() {
  const exercisesRes = await fetch("http://localhost:3000/api/exercises");
  const exercises = await exercisesRes.json();
  const existing = new Set(exercises.map((e) => e.title));

  let created = 0;
  let skipped = 0;

  // Create MC exercises
  for (const ex of newMCExercises) {
    if (existing.has(ex.title)) {
      console.log(`  SKIP (exists): ${ex.title}`);
      skipped++;
      continue;
    }
    const res = await fetch("http://localhost:3000/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ex),
    });
    if (res.ok) {
      created++;
      const data = await res.json();
      console.log(`  Created MC: ${data.title}`);
    } else {
      console.error(`  FAILED: ${ex.title} - ${res.status}`);
    }
  }

  // Create coding exercises
  for (const ex of newCodingExercises) {
    if (existing.has(ex.title)) {
      console.log(`  SKIP (exists): ${ex.title}`);
      skipped++;
      continue;
    }
    const res = await fetch("http://localhost:3000/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ex),
    });
    if (res.ok) {
      created++;
      const data = await res.json();
      console.log(`  Created coding: ${data.title}`);
    } else {
      console.error(`  FAILED: ${ex.title} - ${res.status}`);
    }
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped`);
}

seed();
