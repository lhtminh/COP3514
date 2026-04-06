// Seed missing MC questions from Final Fall 2025
// Also fixes Q1 (array search, not linked list) and Q18 (struct restaurant)

const newExercises = [
  // Q2: Recursive function output tracing
  {
    title: "FF'25 Q2: Recursive Function Tracing",
    description: "What will be the output when this program is run?",
    tags: ["Recursion", "Final Fall 2025"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

void f(int n){
    if (n > 5)
        return;
    printf("%d ", n);
    n += 2;
    f(n);
    printf("%d ", n);
}

int main (){
    f(3);
    return 0;
}`,
    choices: [
      { id: "A", text: "3 5 7 5" },
      { id: "B", text: "3 5 7 5 3" },
      { id: "C", text: "3 5 5 3" },
      { id: "D", text: "3 5 7 7 5 3" },
    ],
    // f(3): print 3, n=5, call f(5)
    //   f(5): print 5, n=7, call f(7)
    //     f(7): 7>5, return
    //   print 7
    // print 5
    // Output: 3 5 7 5
    correctAnswer: "A",
  },
  // Q4: Clear linked list - free all nodes
  {
    title: "FF'25 Q4: Clear Linked List",
    description: "Which alternative completes the missing code in the function `clear_list` to correctly release all nodes from a linked list?",
    tags: ["Linked Lists", "Dynamic Memory", "Final Fall 2025"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `struct node {
    int value;
    struct node *next;
};

void clear_list(struct node *list) {
    struct node *temp;
    while(list != NULL) {
        temp = list;
        // missing code
    }
}`,
    choices: [
      { id: "A", text: "free(temp); list=list->next;" },
      { id: "B", text: "free(list); list=temp->next;" },
      { id: "C", text: "list=list->next; free(list);" },
      { id: "D", text: "list=temp->next; free(temp);" },
    ],
    // Must advance list BEFORE freeing, using temp to hold the node to free
    correctAnswer: "D",
  },
  // Q5: fopen mode
  {
    title: "FF'25 Q5: File Open Mode",
    description: "What does the following program do?",
    tags: ["File I/O", "Final Fall 2025"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int main () {
    FILE *fp = fopen("1.txt", "w");

    if(fp == NULL) return 1;

    return 0;
}`,
    choices: [
      { id: "A", text: "For appending to an existing file \"1.txt\". It does not create a new file for writing if \"1.txt\" doesn't exist." },
      { id: "B", text: "For overwriting an existing file \"1.txt\". It does not create a new file for writing if \"1.txt\" doesn't exist." },
      { id: "C", text: "For overwriting an existing file \"1.txt\". It creates a new file for writing if \"1.txt\" doesn't exist." },
      { id: "D", text: "For appending to an existing file \"1.txt\". It creates a new file for writing if \"1.txt\" doesn't exist." },
    ],
    // "w" mode: open for writing, truncate if exists, create if not
    correctAnswer: "C",
  },
  // Q7: Memory leak identification
  {
    title: "FF'25 Q7: Memory Leak",
    description: "What is the problem with the following code?",
    tags: ["Dynamic Memory", "Pointers", "Final Fall 2025"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

int main(){
    int *p = malloc(20 * sizeof(int));

    p = NULL;

    free(p);

    return 0;
}`,
    choices: [
      { id: "A", text: "Compiler error" },
      { id: "B", text: "Runtime error" },
      { id: "C", text: "Dangling pointer" },
      { id: "D", text: "Memory leak" },
    ],
    // p is set to NULL before free, so the allocated memory is lost
    // free(NULL) is valid and does nothing — but the original block is never freed
    correctAnswer: "D",
  },
  // Q8: fscanf format string
  {
    title: "FF'25 Q8: fscanf Format String",
    description: "Suppose you have just opened a file with FILE pointer pFile on permit request records with the following data format:\n\n```\nCOP2510 84652123 pending\nCOP3514 17680087 approved\n```\n\nThe first field is the course id, the second is the student id, the third is the status.\n\n`student_id` is an int variable, `course_id` is a string variable, and `status` is a string variable.\n\nWhat statement is correct for reading a row of data?",
    tags: ["File I/O", "Final Fall 2025"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `// Data format:
// COP2510 84652123 pending
// COP3514 17680087 approved

// Variables:
// int student_id;
// char course_id[...];  (string)
// char status[...];     (string)`,
    choices: [
      { id: "A", text: "fscanf(pFile, \"%s %d %s\", course_id, &student_id, status);" },
      { id: "B", text: "fscanf(pFile, \"%s %s\", &course_id, &student_id, &status);" },
      { id: "C", text: "fscanf(pFile, \"%s %d %s\", &course_id, student_id, &status);" },
      { id: "D", text: "fscanf(pFile, \"%s %d %s\", course_id, student_id, status);" },
    ],
    // Strings (char arrays) don't need &, ints do need &
    // course_id (no &), &student_id (need &), status (no &)
    correctAnswer: "A",
  },
  // Q9: Function pointer output
  {
    title: "FF'25 Q9: Function Pointer Output",
    description: "What is the output of the following program?",
    tags: ["Functions", "Pointers", "Final Fall 2025"],
    difficulty: "hard",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

int mystery(int (*f) (int)){
    int n = 0;
    while(f(n)>0) n++;
    return n;
}

int g(int i){
    return 3*i - i*i*i + 4;
}

int main(){
    printf("%d\\n", mystery(g));
    return 0;
}`,
    choices: [
      { id: "A", text: "4" },
      { id: "B", text: "2" },
      { id: "C", text: "3" },
      { id: "D", text: "Infinite loop" },
    ],
    // g(0) = 0-0+4 = 4 > 0, n=1
    // g(1) = 3-1+4 = 6 > 0, n=2
    // g(2) = 6-8+4 = 2 > 0, n=3
    // g(3) = 9-27+4 = -14, not > 0 → return 3
    correctAnswer: "C",
  },
  // Q10: Circular linked list
  {
    title: "FF'25 Q10: Circular Linked List",
    description: "A circular linked list is a variation of a linked list in which the last node of the list points to the first node of the list.\n\nConsidering that the variable `head` points to the first node of a circular linked list, which of the following conditions will check if a pointer `p` points to the last node of this list?",
    tags: ["Linked Lists", "Final Fall 2025"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `// Circular linked list: last node's next points back to head
//
//   head → [3] → [5] → [9] ─┐
//           ↑                │
//           └────────────────┘

struct node {
    int value;
    struct node *next;
};
// head points to first node
// p is some pointer to a node in the list`,
    choices: [
      { id: "A", text: "p == head" },
      { id: "B", text: "p->next == head" },
      { id: "C", text: "p == head->next" },
      { id: "D", text: "p->next == NULL" },
      { id: "E", text: "p == NULL" },
    ],
    // Last node's next points to head, so p->next == head
    correctAnswer: "B",
  },
  // Q14: Function pointer with sum
  {
    title: "FF'25 Q14: Function Pointer Call",
    description: "Consider the function `sum` and the function `cube` below. Which of the following statements correctly calls `sum` to compute the sum of cubes?",
    tags: ["Functions", "Pointers", "Final Fall 2025"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `int sum(int (*f)(int), int a, int b){
    int i, total = 0;
    for(i=a; i < b; i++)
        total += f(i);
    return total;
}

int cube(int n) { return n*n*n; }`,
    choices: [
      { id: "A", text: "result = sum(cube(n), 2, 5);" },
      { id: "B", text: "result = sum(*cube, 2, 5);" },
      { id: "C", text: "result = sum(cube(), 2, 5);" },
      { id: "D", text: "result = sum(cube, 2, 5);" },
    ],
    // A: cube(n) evaluates to int, not a function pointer
    // B: *cube works but is non-standard style
    // C: cube() calls with no args — wrong
    // D: cube is the function name = correct function pointer syntax
    correctAnswer: "D",
  },
];

async function seed() {
  // First, fix Q1: delete the linked list version, create array pointer version
  const exercisesRes = await fetch("http://localhost:3000/api/exercises");
  const exercises = await exercisesRes.json();

  // Delete wrong Q1
  const wrongQ1 = exercises.find(e => e.title === "FF'25 Q1: Search Linked List");
  if (wrongQ1) {
    await fetch(`http://localhost:3000/api/exercises/${wrongQ1.id}`, { method: "DELETE" });
    console.log("  Deleted: FF'25 Q1: Search Linked List (was wrong - used linked list instead of array)");
  }

  // Delete old Q18 to replace with correct struct
  const wrongQ18 = exercises.find(e => e.title === "FF'25 Q18: Find Highest Rating");
  if (wrongQ18) {
    await fetch(`http://localhost:3000/api/exercises/${wrongQ18.id}`, { method: "DELETE" });
    console.log("  Deleted: FF'25 Q18: Find Highest Rating (fixing struct to match exam)");
  }

  // Create correct Q1: Array pointer search
  const correctQ1 = {
    title: "FF'25 Q1: Array Pointer Search",
    description:
      "Implement the function `search` that checks if integer `number` is in integer array `a` of length `n` using pointer arithmetic. Return 1 if found, 0 otherwise.\n\nUse a pointer `p` to iterate through the array.\n\nFunction signature:\n  int search(int *a, int n, int number);",
    tags: ["Pointers", "Arrays", "Final Fall 2025"],
    difficulty: "easy",
    starterCode: `#include <stdio.h>

int search(int *a, int n, int number);

int main() {
    int size;
    scanf("%d", &size);
    int arr[100];
    for (int i = 0; i < size; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\\n", search(arr, size, target));
    return 0;
}

int search(int *a, int n, int number) {
    // Use pointer p to search through the array
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "4\n3 5 7 9\n5", expectedOutput: "1", label: "Found in middle" },
      { id: "tc2", input: "4\n3 5 7 9\n4", expectedOutput: "0", label: "Not found" },
      { id: "tc3", input: "1\n10\n10", expectedOutput: "1", label: "Single element, found" },
      { id: "tc4", input: "5\n1 2 3 4 5\n5", expectedOutput: "1", label: "Found at end" },
      { id: "tc5", input: "3\n1 2 3\n0", expectedOutput: "0", label: "Not in array" },
    ],
  };

  // Create correct Q18: struct restaurant with double rating
  const correctQ18 = {
    title: "FF'25 Q18: Find Highest Rating",
    description:
      "Complete the `find_highest` function for finding the restaurant with the highest rating in an array of restaurants. `n` is the number of restaurants stored in the array. Assume each restaurant has a unique rating.\n\nFunction signature:\n  int find_highest(struct restaurant list[], int n);",
    tags: ["Structs", "Arrays", "Final Fall 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

struct restaurant {
    char name[51];
    double rating;
};

int find_highest(struct restaurant list[], int n);

int main() {
    int n;
    scanf("%d", &n);
    struct restaurant list[100];
    for (int i = 0; i < n; i++)
        scanf("%s %lf", list[i].name, &list[i].rating);

    int idx = find_highest(list, n);
    printf("%s %.1f\\n", list[idx].name, list[idx].rating);
    return 0;
}

int find_highest(struct restaurant list[], int n) {
    int i, index_highest = 0;

    // add code to find the restaurant with highest rating in the array,
    // and store the index in index_highest

    // Your code here

    // return index of the restaurant with the highest rating
    return index_highest;
}`,
    testCases: [
      { id: "tc1", input: "3\nPizza 4.2\nSushi 4.8\nTacos 4.5", expectedOutput: "Sushi 4.8", label: "Highest in middle" },
      { id: "tc2", input: "4\nA 3.1\nB 4.9\nC 2.0\nD 4.1", expectedOutput: "B 4.9", label: "4 restaurants" },
      { id: "tc3", input: "1\nSolo 5.0", expectedOutput: "Solo 5.0", label: "Single restaurant" },
      { id: "tc4", input: "3\nX 1.0\nY 2.0\nZ 3.0", expectedOutput: "Z 3.0", label: "Ascending order" },
    ],
  };

  // Create fixed exercises
  for (const ex of [correctQ1, correctQ18]) {
    const res = await fetch("http://localhost:3000/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ex),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(`  Created: ${data.title}`);
    } else {
      console.error(`  FAILED: ${ex.title} - ${res.status}`);
    }
  }

  // Create new MC exercises
  let created = 0;
  for (const ex of newExercises) {
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
  console.log(`\nTotal new MC: ${created}/${newExercises.length}`);
}

seed();
