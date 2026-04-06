// Seed exercises from Final Fall 2025

const exercises = [
  // =====================================================
  // FINAL FALL 2025 - CODING / FILL-IN QUESTIONS
  // =====================================================
  {
    title: "FF'25 Q1: Search Linked List",
    description:
      "Implement the function `search` that traverses a linked list and returns 1 if the given number is found, or 0 if it is not.\n\nFunction signature:\n  int search(struct node *list, int number);",
    tags: ["Linked Lists", "Final Fall 2025"],
    difficulty: "easy",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

int search(struct node *list, int number);

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
    int target;
    scanf("%d", &target);
    struct node *list = build_list(arr, size);
    printf("%d\\n", search(list, target));
    return 0;
}

int search(struct node *list, int number) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "4\n3 5 7 9\n5", expectedOutput: "1", label: "Found in middle" },
      { id: "tc2", input: "4\n3 5 7 9\n4", expectedOutput: "0", label: "Not found" },
      { id: "tc3", input: "1\n10\n10", expectedOutput: "1", label: "Single element, found" },
      { id: "tc4", input: "3\n1 2 3\n3", expectedOutput: "1", label: "Found at end" },
      { id: "tc5", input: "0\n42", expectedOutput: "0", label: "Empty list" },
    ],
  },
  {
    title: "FF'25 Q3: Allocate Struct with malloc",
    description:
      "Which line correctly allocates memory for a `struct tutor` and assigns it to `new_node`?",
    tags: ["Dynamic Memory", "Structs", "Final Fall 2025"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `struct tutor {
    char name[50];
    int rating;
    struct tutor *next;
};

struct tutor *new_node;
/* Which line correctly allocates memory? */`,
    choices: [
      { id: "A", text: "new_node = malloc(struct tutor);" },
      { id: "B", text: "new_node = malloc(sizeof(struct tutor));" },
      { id: "C", text: "new_node = sizeof(malloc(struct tutor));" },
      { id: "D", text: "new_node = malloc(sizeof(tutor));" },
    ],
    correctAnswer: "B",
  },
  {
    title: "FF'25 Q6: Stack Pop Operation",
    description:
      "Implement the function `pop` that removes the top element from a stack (linked list). Store the popped value in `*p` and return the new top of the stack. If the stack is empty, return NULL without modifying `*p`.\n\nFunction signature:\n  struct node *pop(struct node *top, int *p);",
    tags: ["Stacks", "Linked Lists", "Final Fall 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

struct node *pop(struct node *top, int *p);

struct node *push(struct node *top, int val) {
    struct node *n = malloc(sizeof(struct node));
    n->value = val;
    n->next = top;
    return n;
}

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
    int popped;
    stack = pop(stack, &popped);
    printf("%d\\n", popped);
    print_stack(stack);
    return 0;
}

struct node *pop(struct node *top, int *p) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "3\n10 20 30", expectedOutput: "30\n20 10", label: "Pop from 3-element stack" },
      { id: "tc2", input: "1\n42", expectedOutput: "42\n", label: "Pop from single-element stack" },
      { id: "tc3", input: "4\n1 2 3 4", expectedOutput: "4\n3 2 1", label: "Pop from 4-element stack" },
    ],
  },
  {
    title: "FF'25 Q11: Find Duplicate in Linked List",
    description:
      "Implement the function `find_duplicate` that searches a linked list for any value that appears more than once. Return the duplicate value if found, or -1 if all values are unique.\n\nUse a nested loop: for each node `p`, check all subsequent nodes `q` to see if `p->value == q->value`.\n\nFunction signature:\n  int find_duplicate(struct node *list);",
    tags: ["Linked Lists", "Final Fall 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

int find_duplicate(struct node *list);

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
    printf("%d\\n", find_duplicate(list));
    return 0;
}

int find_duplicate(struct node *list) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "5\n1 2 3 2 4", expectedOutput: "2", label: "Duplicate in middle" },
      { id: "tc2", input: "3\n1 2 3", expectedOutput: "-1", label: "No duplicates" },
      { id: "tc3", input: "4\n5 5 5 5", expectedOutput: "5", label: "All same" },
      { id: "tc4", input: "6\n1 2 3 4 5 1", expectedOutput: "1", label: "Duplicate at ends" },
    ],
  },
  {
    title: "FF'25 Q12: Using qsort",
    description:
      "You are given an array `arr` of 50 integers and a comparison function `int_cmp`. Write the single line that calls `qsort` to sort the array in ascending order.\n\nComplete the `sort_array` function which should call `qsort` on the array.",
    tags: ["Arrays", "Functions", "Final Fall 2025"],
    difficulty: "easy",
    type: "multiple-choice",
    starterCode: "",
    testCases: [],
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

int int_cmp(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main() {
    int arr[50];
    // ... arr is filled with values ...

    /* Which line correctly sorts arr using qsort? */

    return 0;
}`,
    choices: [
      { id: "A", text: "qsort(arr, 50, sizeof(int), int_cmp);" },
      { id: "B", text: "qsort(arr, sizeof(int), 50, int_cmp);" },
      { id: "C", text: "qsort(50, arr, sizeof(int), int_cmp);" },
      { id: "D", text: "qsort(arr, 50, int_cmp, sizeof(int));" },
    ],
    correctAnswer: "A",
  },
  {
    title: "FF'25 Q13: Prepend to Linked List",
    description:
      "Implement the function `add_to_list` that creates a new node with value `i`, inserts it at the **beginning** of the linked list, and returns the new head.\n\nFunction signature:\n  struct node *add_to_list(struct node *list, int i);",
    tags: ["Linked Lists", "Final Fall 2025"],
    difficulty: "easy",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

struct node *add_to_list(struct node *list, int i);

void print_list(struct node *list) {
    for (struct node *p = list; p != NULL; p = p->next) {
        if (p != list) printf(" ");
        printf("%d", p->value);
    }
    printf("\\n");
}

int main() {
    int n;
    scanf("%d", &n);
    struct node *list = NULL;
    for (int i = 0; i < n; i++) {
        int val;
        scanf("%d", &val);
        list = add_to_list(list, val);
    }
    print_list(list);
    return 0;
}

struct node *add_to_list(struct node *list, int i) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "3\n1 2 3", expectedOutput: "3 2 1", label: "Prepend 3 elements" },
      { id: "tc2", input: "1\n42", expectedOutput: "42", label: "Prepend to empty list" },
      { id: "tc3", input: "5\n10 20 30 40 50", expectedOutput: "50 40 30 20 10", label: "5 elements reversed" },
    ],
  },
  {
    title: "FF'25 Q15: Last Occurrence in Linked List",
    description:
      "Implement the function `find_last` that traverses a linked list and returns a pointer to the **last** node whose value equals `n`. If no node matches, return NULL.\n\nFunction signature:\n  struct node *find_last(struct node *list, int n);",
    tags: ["Linked Lists", "Final Fall 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

struct node *find_last(struct node *list, int n);

struct node *build_list(int arr[], int size) {
    struct node *head = NULL;
    for (int i = size - 1; i >= 0; i--) {
        struct node *node = malloc(sizeof(struct node));
        node->value = arr[i];
        node->next = head;
        head = node;
    }
    return head;
}

int main() {
    int size;
    scanf("%d", &size);
    int arr[100];
    for (int i = 0; i < size; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    struct node *list = build_list(arr, size);
    struct node *result = find_last(list, target);
    if (result)
        printf("%d\\n", result->value);
    else
        printf("NULL\\n");
    return 0;
}

struct node *find_last(struct node *list, int n) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "5\n3 7 3 5 3\n3", expectedOutput: "3", label: "Multiple occurrences" },
      { id: "tc2", input: "4\n1 2 3 4\n5", expectedOutput: "NULL", label: "Not found" },
      { id: "tc3", input: "3\n10 20 10\n10", expectedOutput: "10", label: "First and last" },
      { id: "tc4", input: "1\n7\n7", expectedOutput: "7", label: "Single element match" },
    ],
  },
  {
    title: "FF'25 Q16: Delete Last Node",
    description:
      "Implement the function `delete_last` that removes the **last** node from a linked list and returns the updated head.\n\nHandle these cases:\n- Empty list: return NULL\n- Single node: free it and return NULL\n- Multiple nodes: find the second-to-last node, free the last, set second-to-last's next to NULL\n\nFunction signature:\n  struct node *delete_last(struct node *list);",
    tags: ["Linked Lists", "Final Fall 2025"],
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
        struct node *n = malloc(sizeof(struct node));
        n->value = arr[i];
        n->next = head;
        head = n;
    }
    return head;
}

void print_list(struct node *list) {
    if (list == NULL) {
        printf("(empty)\\n");
        return;
    }
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
      { id: "tc1", input: "4\n1 2 3 4", expectedOutput: "1 2 3", label: "Delete last of 4" },
      { id: "tc2", input: "1\n42", expectedOutput: "(empty)", label: "Single node" },
      { id: "tc3", input: "2\n10 20", expectedOutput: "10", label: "Two nodes" },
      { id: "tc4", input: "0", expectedOutput: "(empty)", label: "Empty list" },
      { id: "tc5", input: "5\n5 4 3 2 1", expectedOutput: "5 4 3 2", label: "Delete last of 5" },
    ],
  },
  {
    title: "FF'25 Q17: File Average (stdin)",
    description:
      "Read integers from stdin until EOF. Print the average as an integer (integer division) and the count of numbers read.\n\nOutput format:\n  average: <avg>\\ncount: <count>\n\nThis is based on the original exam question which reads from a file — here we use stdin instead.",
    tags: ["File I/O", "Final Fall 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

int main() {
    // Read integers from stdin until EOF
    // Print the average (integer division) and count
    // Format:
    //   average: <avg>
    //   count: <count>

    return 0;
}`,
    testCases: [
      { id: "tc1", input: "10 20 30", expectedOutput: "average: 20\ncount: 3", label: "Three numbers" },
      { id: "tc2", input: "5", expectedOutput: "average: 5\ncount: 1", label: "Single number" },
      { id: "tc3", input: "1 2 3 4 5 6 7 8 9 10", expectedOutput: "average: 5\ncount: 10", label: "1 to 10" },
      { id: "tc4", input: "100 200", expectedOutput: "average: 150\ncount: 2", label: "Two numbers" },
    ],
  },
  {
    title: "FF'25 Q18: Find Highest Rating",
    description:
      "Given an array of structs with a `rating` field, implement `find_highest` that returns the **index** of the element with the highest rating. Start comparing from index 1.\n\nFunction signature:\n  int find_highest(struct item list[], int n);",
    tags: ["Structs", "Arrays", "Final Fall 2025"],
    difficulty: "medium",
    starterCode: `#include <stdio.h>

struct item {
    char name[50];
    int rating;
};

int find_highest(struct item list[], int n);

int main() {
    int n;
    scanf("%d", &n);
    struct item list[100];
    for (int i = 0; i < n; i++)
        scanf("%s %d", list[i].name, &list[i].rating);

    int idx = find_highest(list, n);
    printf("%s %d\\n", list[idx].name, list[idx].rating);
    return 0;
}

int find_highest(struct item list[], int n) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "3\nAlice 85\nBob 92\nCarol 78", expectedOutput: "Bob 92", label: "Highest in middle" },
      { id: "tc2", input: "4\nA 10\nB 30\nC 20\nD 25", expectedOutput: "B 30", label: "4 items" },
      { id: "tc3", input: "1\nSolo 100", expectedOutput: "Solo 100", label: "Single item" },
      { id: "tc4", input: "3\nX 50\nY 50\nZ 50", expectedOutput: "X 50", label: "All equal (first wins)" },
    ],
  },
  {
    title: "FF'25 Q19: Insert After Node",
    description:
      "Implement the function `insert_after` that inserts a new node with value `new_val` **after** the first node whose value equals `target`. If `target` is not found, do not modify the list.\n\nReturn the head of the list.\n\nFunction signature:\n  struct node *insert_after(struct node *list, int target, int new_val);",
    tags: ["Linked Lists", "Final Fall 2025"],
    difficulty: "hard",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int value;
    struct node *next;
};

struct node *insert_after(struct node *list, int target, int new_val);

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
    int target, new_val;
    scanf("%d %d", &target, &new_val);
    struct node *list = build_list(arr, size);
    list = insert_after(list, target, new_val);
    print_list(list);
    return 0;
}

struct node *insert_after(struct node *list, int target, int new_val) {
    // Your code here
}`,
    testCases: [
      { id: "tc1", input: "4\n1 2 3 4\n2 99", expectedOutput: "1 2 99 3 4", label: "Insert after middle node" },
      { id: "tc2", input: "3\n10 20 30\n30 40", expectedOutput: "10 20 30 40", label: "Insert after last node" },
      { id: "tc3", input: "3\n1 2 3\n5 99", expectedOutput: "1 2 3", label: "Target not found" },
      { id: "tc4", input: "1\n7\n7 8", expectedOutput: "7 8", label: "Single node, insert after it" },
      { id: "tc5", input: "4\n5 5 5 5\n5 99", expectedOutput: "5 99 5 5 5", label: "Insert after first occurrence" },
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
