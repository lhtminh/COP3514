const exercises = [
  // =====================================================
  // FINAL FALL 2024 - MC QUESTIONS
  // =====================================================
  {
    title: "F'24 Q1: malloc for Struct",
    description: "Which statement correctly allocates memory for a struct employee and assigns it to the pointer new_employee?",
    tags: ["Structs", "Dynamic Memory", "Final 2024"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `struct employee {
    char name[50];
    double salary;
    int department;
};

struct employee *new_employee;
/* Which statement allocates memory for new_employee? */`,
    choices: [
      { id: "A", text: "new_employee = malloc(sizeof(struct employee));" },
      { id: "B", text: "new_employee = malloc(sizeof(employee));" },
      { id: "C", text: "malloc(new_employee, sizeof(struct employee));" },
      { id: "D", text: "new_employee = sizeof(struct employee);" },
    ],
    correctAnswer: "A",
  },
  {
    title: "F'24 Q3: Find Largest in Linked List",
    description: "Which statement correctly updates 'largest' to point to the current node if its value is greater?",
    tags: ["Linked Lists", "Final 2024"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `struct node {
    int value;
    struct node *next;
};

/* Inside a loop traversing the list with pointer p: */
/* largest initially points to the first node */
struct node *largest = list;
struct node *p;
for (p = list->next; p != NULL; p = p->next) {
    /* MISSING: update largest if p->value is bigger */
}`,
    choices: [
      { id: "A", text: "if (p->value > largest->value) largest = p;" },
      { id: "B", text: "if (p > largest) largest = p;" },
      { id: "C", text: "if (p->value > largest) largest->value = p->value;" },
      { id: "D", text: "if (*p > *largest) largest = p;" },
    ],
    correctAnswer: "A",
  },
  {
    title: "F'24 Q4: Linked List Traversal Output",
    description: "What does this program print?",
    tags: ["Linked Lists", "Final 2024"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

int main() {
    // Build list: -1 -> 0 -> 1 -> 2 -> NULL
    struct node n3 = {2, NULL};
    struct node n2 = {1, &n3};
    struct node n1 = {0, &n2};
    struct node n0 = {-1, &n1};

    struct node *p;
    for (p = &n0; p != NULL; p = p->next)
        printf("%d ", p->value);
    printf("\\n");
    return 0;
}`,
    choices: [
      { id: "A", text: "-1 0 1 2" },
      { id: "B", text: "2 1 0 -1" },
      { id: "C", text: "-1 0 1" },
      { id: "D", text: "0 1 2" },
    ],
    correctAnswer: "A",
  },
  {
    title: "F'24 Q5: Stack Operations Trace",
    description: "Given a stack implemented as a linked list (push adds to front, pop removes from front), what is the order of elements from top to bottom after these operations?\n\npush(1), push(2), push(3), pop(), push(4)",
    tags: ["Stacks", "Final 2024"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `// Stack operations (linked list, push to front):
// push(1): stack = [1]
// push(2): stack = [2, 1]
// push(3): stack = [3, 2, 1]
// pop():   removes 3, stack = [2, 1]
// push(4): stack = [4, 2, 1]

// Print from top to bottom:`,
    choices: [
      { id: "A", text: "4 2 1" },
      { id: "B", text: "1 2 4" },
      { id: "C", text: "2 3 1 4" },
      { id: "D", text: "4 3 2 1" },
    ],
    correctAnswer: "A",
  },
  {
    title: "F'24 Q6: Stack Push Implementation",
    description: "Which three statements correctly complete the push function for a stack implemented as a linked list?",
    tags: ["Stacks", "Linked Lists", "Final 2024"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `struct node {
    int value;
    struct node *next;
};

struct node *push(struct node *top, int i) {
    struct node *new_node = malloc(sizeof(struct node));
    /* Statement 1: set new_node's value */
    /* Statement 2: set new_node's next */
    /* Statement 3: return */
}`,
    choices: [
      { id: "A", text: "new_node->value = i;  new_node->next = top;  return new_node;" },
      { id: "B", text: "new_node->value = i;  top->next = new_node;  return top;" },
      { id: "C", text: "new_node->value = i;  new_node->next = NULL;  return new_node;" },
      { id: "D", text: "top->value = i;  new_node->next = top;  return new_node;" },
    ],
    correctAnswer: "A",
  },

  // =====================================================
  // FINAL FALL 2024 - CODING QUESTIONS
  // =====================================================
  {
    title: "F'24 Q7: Sum with Function Pointer",
    description: "Implement the function sum_from_to that computes f(start) + f(start+1) + ... + f(end), where f is a function pointer.\n\nFunction signature:\n  int sum_from_to(int start, int end, int (*f)(int));",
    tags: ["Functions", "Final 2024"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

int sum_from_to(int start, int end, int (*f)(int));

int square(int x) { return x * x; }
int identity(int x) { return x; }

int main() {
    int a, b, mode;
    scanf("%d %d %d", &a, &b, &mode);
    if (mode == 0)
        printf("%d\\n", sum_from_to(a, b, identity));
    else
        printf("%d\\n", sum_from_to(a, b, square));
    return 0;
}

int sum_from_to(int start, int end, int (*f)(int)) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "1 5 0", expectedOutput: "15", label: "sum 1+2+3+4+5" },
      { id: "tc2", input: "1 3 1", expectedOutput: "14", label: "1^2+2^2+3^2" },
      { id: "tc3", input: "3 3 0", expectedOutput: "3", label: "single value" },
      { id: "tc4", input: "1 4 1", expectedOutput: "30", label: "1+4+9+16" },
    ],
  },
  {
    title: "F'24 Q8: Append to Linked List",
    description: "Implement append_to_list that adds a new node with value n to the END of a linked list. Return the head of the list.\n\nHandle the empty list case (list == NULL).\n\nInput: first line is the number of initial elements, followed by the elements, then the value to append.\nOutput: all elements space-separated.",
    tags: ["Linked Lists", "Dynamic Memory", "Final 2024"],
    difficulty: "hard",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

struct node *append_to_list(struct node *list, int n);

struct node *build_list(int arr[], int size) {
    struct node *head = NULL;
    for (int i = size - 1; i >= 0; i--) {
        struct node *new_node = malloc(sizeof(struct node));
        new_node->value = arr[i];
        new_node->next = head;
        head = new_node;
    }
    return head;
}

void print_list(struct node *list) {
    for (struct node *p = list; p != NULL; p = p->next) {
        if (p != list) printf(" ");
        printf("%d", p->value);
    }
    printf("\\n");
}

int main() {
    int size;
    scanf("%d", &size);
    int arr[100];
    for (int i = 0; i < size; i++) scanf("%d", &arr[i]);
    int val;
    scanf("%d", &val);
    struct node *list = build_list(arr, size);
    list = append_to_list(list, val);
    print_list(list);
    return 0;
}

struct node *append_to_list(struct node *list, int n) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "3\n1 2 3\n4", expectedOutput: "1 2 3 4", label: "Append to existing list" },
      { id: "tc2", input: "0\n5", expectedOutput: "5", label: "Append to empty list" },
      { id: "tc3", input: "1\n10\n20", expectedOutput: "10 20", label: "Append to single-element list" },
    ],
  },
  {
    title: "F'24 Q9: Delete Last Node",
    description: "Implement delete_last that removes the last node from a linked list and frees its memory. Return the head.\n\nHandle: empty list (return NULL) and single-node list.\n\nInput: number of elements, then elements.\nOutput: remaining list after deleting the last node.",
    tags: ["Linked Lists", "Dynamic Memory", "Final 2024"],
    difficulty: "hard",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

struct node *delete_last(struct node *list);

struct node *build_list(int arr[], int size) {
    struct node *head = NULL;
    for (int i = size - 1; i >= 0; i--) {
        struct node *new_node = malloc(sizeof(struct node));
        new_node->value = arr[i];
        new_node->next = head;
        head = new_node;
    }
    return head;
}

void print_list(struct node *list) {
    if (list == NULL) { printf("(empty)\\n"); return; }
    for (struct node *p = list; p != NULL; p = p->next) {
        if (p != list) printf(" ");
        printf("%d", p->value);
    }
    printf("\\n");
}

int main() {
    int size;
    scanf("%d", &size);
    int arr[100];
    for (int i = 0; i < size; i++) scanf("%d", &arr[i]);
    struct node *list = build_list(arr, size);
    list = delete_last(list);
    print_list(list);
    return 0;
}

struct node *delete_last(struct node *list) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "4\n1 2 3 4", expectedOutput: "1 2 3", label: "Delete from 4-element list" },
      { id: "tc2", input: "1\n5", expectedOutput: "(empty)", label: "Delete from single-element list" },
      { id: "tc3", input: "2\n10 20", expectedOutput: "10", label: "Delete from 2-element list" },
    ],
  },

  // =====================================================
  // FINAL SPRING 2025 - MC QUESTIONS
  // =====================================================
  {
    title: "F'25 Q1: Linked List Count",
    description: "What does this function return when called on the list 5 -> 3 -> 7 -> 3 -> NULL with target = 3?",
    tags: ["Linked Lists", "Final 2025"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `int count(struct node *list, int target) {
    int c = 0;
    struct node *p;
    for (p = list; p != NULL; p = p->next)
        if (p->value == target)
            c++;
    return c;
}

// Called with list: 5 -> 3 -> 7 -> 3 -> NULL
// target = 3`,
    choices: [
      { id: "A", text: "1" },
      { id: "B", text: "2" },
      { id: "C", text: "3" },
      { id: "D", text: "0" },
    ],
    // 3 appears twice
    correctAnswer: "B",
  },
  {
    title: "F'25 Q5: Recursive Call Trace",
    description: "What values of n are printed when f(8) is called?",
    tags: ["Recursion", "Final 2025"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `void f(int n) {
    printf("n=%d\\n", n);
    if (n <= 6)
        return;
    f(n - 1);
}

// What is printed when calling f(8)?`,
    choices: [
      { id: "A", text: "n=8  n=7  n=6" },
      { id: "B", text: "n=8  n=7" },
      { id: "C", text: "n=6  n=7  n=8" },
      { id: "D", text: "n=8  n=7  n=6  n=5" },
    ],
    // f(8): print 8, 8>6 so call f(7). f(7): print 7, 7>6 so call f(6). f(6): print 6, 6<=6 return.
    correctAnswer: "A",
  },
  {
    title: "F'25 Q8: Circular Linked List Detection",
    description: "In a circular singly linked list, the last node's next pointer points back to the head. Which condition detects that node p is the last node?",
    tags: ["Linked Lists", "Final 2025"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `struct node {
    int value;
    struct node *next;
};

// head points to the first node of a circular list
// p is traversing the list
// Which condition is true when p is the LAST node?`,
    choices: [
      { id: "A", text: "p->next == NULL" },
      { id: "B", text: "p == NULL" },
      { id: "C", text: "p->next == p" },
      { id: "D", text: "p->next == head" },
    ],
    correctAnswer: "D",
  },
  {
    title: "F'25 Q9: File I/O Concepts",
    description: "Which statement about file I/O in C is correct?",
    tags: ["File I/O", "Final 2025"],
    difficulty: "medium",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `// Consider these file operations:
FILE *fp = fopen("data.txt", "r");
// ... read operations ...
fclose(fp);`,
    choices: [
      { id: "A", text: "feof() returns true before attempting to read past the end of file" },
      { id: "B", text: "fclose() is optional; files are automatically closed when the program exits" },
      { id: "C", text: "fscanf() returns EOF when it fails to read any items" },
      { id: "D", text: "feof() returns true only AFTER a read operation has failed due to reaching end of file" },
    ],
    correctAnswer: "D",
  },
  {
    title: "F'25 Q11: malloc for Struct",
    description: "Which statement correctly allocates memory for a struct debt?",
    tags: ["Structs", "Dynamic Memory", "Final 2025"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `struct debt {
    char creditor[100];
    double amount;
    double interest_rate;
};

struct debt *new_debt;
/* Which allocates memory? */`,
    choices: [
      { id: "A", text: "new_debt = malloc(sizeof(struct debt));" },
      { id: "B", text: "new_debt = malloc(sizeof(debt));" },
      { id: "C", text: "new_debt = calloc(struct debt);" },
      { id: "D", text: "malloc(new_debt, sizeof(struct debt));" },
    ],
    correctAnswer: "A",
  },
  {
    title: "F'25 Q12: Struct Pointer Access",
    description: "Which expression correctly accesses the 'salary' field of an employee through a pointer?",
    tags: ["Structs", "Final 2025"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `struct employee {
    char name[50];
    double salary;
};

struct employee *ptr;
// ptr points to a valid employee struct
// How to access salary?`,
    choices: [
      { id: "A", text: "ptr.salary" },
      { id: "B", text: "(*ptr).salary  or equivalently  ptr->salary" },
      { id: "C", text: "ptr->salary" },
      { id: "D", text: "&ptr->salary" },
    ],
    correctAnswer: "C",
  },
  {
    title: "F'25 Q13: Struct Array Trace",
    description: "What does this program print?",
    tags: ["Structs", "Arrays", "Final 2025"],
    difficulty: "hard",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>

struct item {
    int id;
    int qty;
};

int main() {
    struct item inv[] = {{10, 28}, {20, 41}, {30, 9}, {40, 13}};
    int n = 4;
    for (int i = 0; i < n; i++)
        printf("%d ", inv[i].qty);
    printf("\\n");
    return 0;
}`,
    choices: [
      { id: "A", text: "10 20 30 40" },
      { id: "B", text: "28 41 9 13" },
      { id: "C", text: "10 28 20 41" },
      { id: "D", text: "13 9 41 28" },
    ],
    correctAnswer: "B",
  },
  {
    title: "F'25 Q15: Linked List Deletion",
    description: "After executing: list = delete_first(list) on the list 10 -> 20 -> 30, which statement about the implementation is true?",
    tags: ["Linked Lists", "Final 2025"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `struct node *delete_first(struct node *list) {
    struct node *new_head = list->next;
    free(list);
    return new_head;
}
// Called on list: 10 -> 20 -> 30 -> NULL`,
    choices: [
      { id: "A", text: "Returns pointer to node with value 20; node 10 is freed" },
      { id: "B", text: "Returns pointer to node with value 30; nodes 10 and 20 are freed" },
      { id: "C", text: "Returns NULL; all nodes are freed" },
      { id: "D", text: "Returns pointer to node with value 10; nothing is freed" },
    ],
    correctAnswer: "A",
  },

  // =====================================================
  // FINAL SPRING 2025 - CODING QUESTIONS
  // =====================================================
  {
    title: "F'25 Q2: Check Duplicate in Linked List",
    description: "Implement has_duplicate that checks if a node's value appears more than once in the linked list. For a given node p, check if any later node q has the same value.\n\nReturn 1 if any duplicate exists, 0 otherwise.\n\nInput: number of elements, then elements.\nOutput: 1 or 0.",
    tags: ["Linked Lists", "Final 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

int has_duplicate(struct node *list);

struct node *build_list(int arr[], int size) {
    struct node *head = NULL;
    for (int i = size - 1; i >= 0; i--) {
        struct node *n = malloc(sizeof(struct node));
        n->value = arr[i];
        n->next = head;
        head = n;
    }
    return head;
}

int main() {
    int size;
    scanf("%d", &size);
    int arr[100];
    for (int i = 0; i < size; i++) scanf("%d", &arr[i]);
    struct node *list = build_list(arr, size);
    printf("%d\\n", has_duplicate(list));
    return 0;
}

int has_duplicate(struct node *list) {
    // For each node p, check if any node q after p has the same value
    // Return 1 if duplicate found, 0 otherwise
}`,
    testCases: [
      { id: "tc1", input: "4\n1 2 3 2", expectedOutput: "1", label: "Has duplicate (2)" },
      { id: "tc2", input: "3\n1 2 3", expectedOutput: "0", label: "No duplicates" },
      { id: "tc3", input: "5\n5 5 5 5 5", expectedOutput: "1", label: "All same" },
      { id: "tc4", input: "1\n42", expectedOutput: "0", label: "Single element" },
    ],
  },
  {
    title: "F'25 Q4: Free All Nodes",
    description: "Implement free_all that frees every node in a linked list.\n\nHint: save list->next before freeing list.\n\nInput: number of elements, then elements.\nOutput: print \"done\" after freeing all nodes.",
    tags: ["Linked Lists", "Dynamic Memory", "Final 2025"],
    difficulty: "easy",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

void free_all(struct node *list);

struct node *build_list(int arr[], int size) {
    struct node *head = NULL;
    for (int i = size - 1; i >= 0; i--) {
        struct node *n = malloc(sizeof(struct node));
        n->value = arr[i];
        n->next = head;
        head = n;
    }
    return head;
}

int main() {
    int size;
    scanf("%d", &size);
    int arr[100];
    for (int i = 0; i < size; i++) scanf("%d", &arr[i]);
    struct node *list = build_list(arr, size);
    free_all(list);
    printf("done\\n");
    return 0;
}

void free_all(struct node *list) {
    // Free every node in the list
}`,
    testCases: [
      { id: "tc1", input: "3\n1 2 3", expectedOutput: "done", label: "Free 3-node list" },
      { id: "tc2", input: "0", expectedOutput: "done", label: "Empty list" },
      { id: "tc3", input: "1\n5", expectedOutput: "done", label: "Single node" },
    ],
  },
  {
    title: "F'25 Q6: Sum with Function Pointer",
    description: "Complete the function sum_range that computes f(start) + f(start+1) + ... + f(end).\n\nFunction signature:\n  int sum_range(int start, int end, int (*f)(int));",
    tags: ["Functions", "Final 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

int sum_range(int start, int end, int (*f)(int));

int cube(int x) { return x * x * x; }
int identity(int x) { return x; }

int main() {
    int a, b, mode;
    scanf("%d %d %d", &a, &b, &mode);
    if (mode == 0)
        printf("%d\\n", sum_range(a, b, identity));
    else
        printf("%d\\n", sum_range(a, b, cube));
    return 0;
}

int sum_range(int start, int end, int (*f)(int)) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "1 5 0", expectedOutput: "15", label: "sum 1..5" },
      { id: "tc2", input: "1 3 1", expectedOutput: "36", label: "1^3+2^3+3^3" },
      { id: "tc3", input: "5 5 0", expectedOutput: "5", label: "single value" },
      { id: "tc4", input: "2 4 1", expectedOutput: "99", label: "8+27+64" },
    ],
  },
  {
    title: "F'25 Q7: Reverse Array with Pointers",
    description: "Complete the code that reverses an array in-place using two pointers p (start) and q (end). Swap *p and *q, then move inward.\n\nFill in the 5 statements inside the while loop.",
    tags: ["Pointers", "Arrays", "Final 2025"],
    difficulty: "easy",
    starterCode: `#include <stdio.h>

void reverse(int *arr, int n) {
    int *p = arr;
    int *q = arr + n - 1;
    while (p < q) {
        // Swap *p and *q using a temp variable
        // Then move p forward and q backward
        // Your code here (5 statements)
    }
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    reverse(arr, n);
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
    testCases: [
      { id: "tc1", input: "5\n1 2 3 4 5", expectedOutput: "5 4 3 2 1", label: "5 elements" },
      { id: "tc2", input: "4\n10 20 30 40", expectedOutput: "40 30 20 10", label: "4 elements" },
      { id: "tc3", input: "1\n42", expectedOutput: "42", label: "single element" },
    ],
  },
  {
    title: "F'25 Q14: Delete First Node",
    description: "Implement delete_first that removes the first node from a linked list, frees it, and returns the new head.\n\nInput: number of elements, then elements.\nOutput: remaining list.",
    tags: ["Linked Lists", "Dynamic Memory", "Final 2025"],
    difficulty: "easy",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

struct node *delete_first(struct node *list);

struct node *build_list(int arr[], int size) {
    struct node *head = NULL;
    for (int i = size - 1; i >= 0; i--) {
        struct node *n = malloc(sizeof(struct node));
        n->value = arr[i];
        n->next = head;
        head = n;
    }
    return head;
}

void print_list(struct node *list) {
    if (list == NULL) { printf("(empty)\\n"); return; }
    for (struct node *p = list; p != NULL; p = p->next) {
        if (p != list) printf(" ");
        printf("%d", p->value);
    }
    printf("\\n");
}

int main() {
    int size;
    scanf("%d", &size);
    int arr[100];
    for (int i = 0; i < size; i++) scanf("%d", &arr[i]);
    struct node *list = build_list(arr, size);
    list = delete_first(list);
    print_list(list);
    return 0;
}

struct node *delete_first(struct node *list) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "3\n10 20 30", expectedOutput: "20 30", label: "Delete from 3 nodes" },
      { id: "tc2", input: "1\n5", expectedOutput: "(empty)", label: "Delete only node" },
      { id: "tc3", input: "4\n1 2 3 4", expectedOutput: "2 3 4", label: "Delete from 4 nodes" },
    ],
  },
  {
    title: "F'25 Q16: Stack Push with Error Check",
    description: "Implement push for a stack (linked list). Allocate a new node, check if malloc failed (print \"malloc failed\" and return top), set value and next, return the new top.",
    tags: ["Stacks", "Dynamic Memory", "Final 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

struct node *push(struct node *top, int i);

void print_stack(struct node *top) {
    for (struct node *p = top; p != NULL; p = p->next) {
        if (p != top) printf(" ");
        printf("%d", p->value);
    }
    printf("\\n");
}

int main() {
    int n;
    scanf("%d", &n);
    struct node *stack = NULL;
    for (int i = 0; i < n; i++) {
        int val;
        scanf("%d", &val);
        stack = push(stack, val);
    }
    print_stack(stack);
    return 0;
}

struct node *push(struct node *top, int i) {
    // Allocate new node
    // Check malloc failure
    // Set value and next
    // Return new top
}`,
    testCases: [
      { id: "tc1", input: "3\n1 2 3", expectedOutput: "3 2 1", label: "Push 3 values" },
      { id: "tc2", input: "1\n42", expectedOutput: "42", label: "Push single value" },
      { id: "tc3", input: "5\n10 20 30 40 50", expectedOutput: "50 40 30 20 10", label: "Push 5 values" },
    ],
  },
  {
    title: "F'25 Q18: Update Inventory",
    description: "Implement update that searches an inventory array for a part with the given number. If found, prompt for quantity change and update on_hand. If not found, print \"Part not found.\"",
    tags: ["Structs", "Arrays", "Final 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

struct part {
    int number;
    int on_hand;
};

void update(struct part inv[], int np);

int main() {
    int np;
    scanf("%d", &np);
    struct part inv[100];
    for (int i = 0; i < np; i++)
        scanf("%d %d", &inv[i].number, &inv[i].on_hand);

    update(inv, np);

    // Print final inventory
    for (int i = 0; i < np; i++)
        printf("%d:%d\\n", inv[i].number, inv[i].on_hand);
    return 0;
}

void update(struct part inv[], int np) {
    int number, change;
    scanf("%d", &number);

    // Search for part with matching number
    // If found: read change, update on_hand
    // If not found: print "Part not found.\\n"
}`,
    testCases: [
      { id: "tc1", input: "3\n101 50\n102 30\n103 20\n102 10", expectedOutput: "101:50\n102:40\n103:20", label: "Update existing part" },
      { id: "tc2", input: "2\n101 50\n102 30\n999 5", expectedOutput: "Part not found.\n101:50\n102:30", label: "Part not found" },
      { id: "tc3", input: "2\n10 100\n20 200\n10 -50", expectedOutput: "10:50\n20:200", label: "Decrease quantity" },
    ],
  },
  {
    title: "F'25 Q19: Insert Before Node",
    description: "Implement insert_before that inserts a new node with value n before the node with value nb in the list. If nb is not found, return the list unchanged.\n\nThe new_node is already allocated for you.\n\nInput: list size, elements, value to insert (n), value to insert before (nb).\nOutput: resulting list.",
    tags: ["Linked Lists", "Final 2025"],
    difficulty: "hard",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

struct node *insert_before(struct node *list, struct node *new_node, int n, int nb);

struct node *build_list(int arr[], int size) {
    struct node *head = NULL;
    for (int i = size - 1; i >= 0; i--) {
        struct node *nd = malloc(sizeof(struct node));
        nd->value = arr[i];
        nd->next = head;
        head = nd;
    }
    return head;
}

void print_list(struct node *list) {
    if (list == NULL) { printf("(empty)\\n"); return; }
    for (struct node *p = list; p != NULL; p = p->next) {
        if (p != list) printf(" ");
        printf("%d", p->value);
    }
    printf("\\n");
}

int main() {
    int size;
    scanf("%d", &size);
    int arr[100];
    for (int i = 0; i < size; i++) scanf("%d", &arr[i]);
    int n, nb;
    scanf("%d %d", &n, &nb);
    struct node *list = build_list(arr, size);
    struct node *new_node = malloc(sizeof(struct node));
    list = insert_before(list, new_node, n, nb);
    print_list(list);
    return 0;
}

struct node *insert_before(struct node *list, struct node *new_node, int n, int nb) {
    // Set new_node->value = n
    // Find node with value nb using prev/cur traversal
    // If not found, return list unchanged
    // If found at head, new_node->next = list, return new_node
    // Otherwise, prev->next = new_node, new_node->next = cur, return list
}`,
    testCases: [
      { id: "tc1", input: "3\n1 2 3\n5 2", expectedOutput: "1 5 2 3", label: "Insert 5 before 2" },
      { id: "tc2", input: "3\n1 2 3\n5 1", expectedOutput: "5 1 2 3", label: "Insert before head" },
      { id: "tc3", input: "3\n1 2 3\n5 9", expectedOutput: "1 2 3", label: "Target not found" },
      { id: "tc4", input: "1\n10\n5 10", expectedOutput: "5 10", label: "Insert before only node" },
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
