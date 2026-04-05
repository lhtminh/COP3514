"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const sections = [
  {
    title: "Basic Structure",
    tag: "basics",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // code here
    return 0;
}`,
  },
  {
    title: "Data Types & Operators",
    tag: "basics",
    code: `char c = 'A';           // 1 byte
int n = 42;              // 4 bytes
float f = 3.14f;         // 4 bytes
double d = 3.14159;      // 8 bytes

// Integer division & modulus
7 / 2   == 3             // truncates
7 % 2   == 1             // remainder
// Precedence: * / % before + -
int z = 10 + 4 / 2;     // z = 12 (not 7)`,
  },
  {
    title: "printf / scanf",
    tag: "I/O",
    code: `// printf format specifiers
%d    int          %f    float/double
%c    char         %s    string
%lf   double(scanf)%ld   long
%%    literal %    \\n   newline
%5d   right-align  %-5d  left-align

// scanf — always use & (except strings)
int n; scanf("%d", &n);
double d; scanf("%lf", &d);
char c; scanf(" %c", &c);   // space skips \\n
char s[100]; scanf("%s", s); // no &
fgets(s, 100, stdin);        // read full line`,
  },
  {
    title: "Control Flow & Loops",
    tag: "flow",
    code: `if (x > 0) { ... }
else if (x == 0) { ... }
else { ... }

for (int i = 0; i < n; i++) { ... }
while (condition) { ... }
do { ... } while (condition);

// break exits loop, continue skips iteration
for (int i = 1; i <= 20; i++) {
    if (i % 2 == 0) continue; // skip evens
    printf("%d ", i);
}`,
  },
  {
    title: "Arrays",
    tag: "arrays",
    code: `int arr[5] = {1, 2, 3, 4, 5};
int zeros[100] = {0};          // all zeros
int n = sizeof(arr)/sizeof(arr[0]); // length

// Traversal
for (int i = 0; i < n; i++)
    printf("%d ", arr[i]);

// Struct array
struct part inv[] = {{10,50}, {20,30}};
inv[0].on_hand += 5;`,
  },
  {
    title: "Strings (char arrays)",
    tag: "strings",
    code: `#include <string.h>
char s[] = "hello";          // s[5] = '\\0'
int len = strlen(s);         // 5
strcmp(a, b);                 // <0, 0, >0
strcpy(dest, src);           // copy
strcat(dest, src);           // append
atoi("42");                  // string → int

// Character checks (include <ctype.h>)
isalpha(c)  isupper(c)  islower(c)
toupper(c)  tolower(c)  isdigit(c)`,
  },
  {
    title: "Pointers",
    tag: "pointers",
    code: `int x = 10;
int *p = &x;        // p stores address of x
*p = 20;             // dereference: x is now 20

// Pointer arithmetic (arrays)
int a[] = {10, 20, 30, 40, 50};
int *p = a;          // p points to a[0]
*(p + 2) == a[2]     // 30
p++; // now p points to a[1]

// Pointer subtraction
int *q = a + 4;
q - p == 3;          // distance in elements`,
  },
  {
    title: "Dynamic Memory (malloc/free)",
    tag: "memory",
    code: `#include <stdlib.h>

// Allocate single struct
struct node *p = malloc(sizeof(struct node));
if (p == NULL) { printf("malloc failed"); }

// Allocate array
int *arr = malloc(n * sizeof(int));
int *arr2 = calloc(n, sizeof(int)); // zero-init

// Always free when done
free(p);
free(arr);`,
  },
  {
    title: "Functions & Function Pointers",
    tag: "functions",
    code: `// Pass by reference (using pointers)
void swap(int *a, int *b) {
    int temp = *a; *a = *b; *b = temp;
}
swap(&x, &y);

// Function pointer parameter
int sum_range(int a, int b, int (*f)(int)) {
    int result = 0;
    for (int i = a; i <= b; i++)
        result += f(i);
    return result;
}
int sq(int x) { return x * x; }
sum_range(1, 3, sq); // 1+4+9 = 14`,
  },
  {
    title: "Recursion",
    tag: "functions",
    code: `// Base case + recursive case
int factorial(int n) {
    if (n <= 1) return 1;     // base case
    return n * factorial(n-1); // recursive
}

// Sum 1..n
int sum(int n) {
    if (n == 0) return 0;
    return n + sum(n - 1);
}
// sum(5) = 5+4+3+2+1 = 15`,
  },
  {
    title: "Structs",
    tag: "structs",
    code: `struct employee {
    char name[50];
    double salary;
};

struct employee e = {"Alice", 50000};
e.salary = 55000;

// Pointer to struct
struct employee *p = &e;
p->salary = 60000; // same as (*p).salary

// malloc for struct
struct employee *new_emp;
new_emp = malloc(sizeof(struct employee));`,
  },
  {
    title: "Linked Lists",
    tag: "linked lists",
    code: `struct node {
    int value;
    struct node *next;
};

// Traverse
for (p = list; p != NULL; p = p->next)
    printf("%d ", p->value);

// Insert at front (push)
new_node->value = val;
new_node->next = list;
return new_node;  // new head

// Delete first
struct node *temp = list->next;
free(list);
return temp;  // new head`,
  },
  {
    title: "Linked List Patterns",
    tag: "linked lists",
    code: `// Free all nodes
while (list != NULL) {
    struct node *p = list;
    list = list->next;
    free(p);
}

// Search with prev/cur (for insert/delete)
struct node *prev = NULL, *cur = list;
for (; cur != NULL && cur->value != target;
     prev = cur, cur = cur->next) ;

if (prev == NULL) // target is at head
    list = cur->next;
else
    prev->next = cur->next;`,
  },
  {
    title: "Stack (Linked List)",
    tag: "stacks",
    code: `// Push (insert at front)
struct node *push(struct node *top, int val) {
    struct node *n = malloc(sizeof(struct node));
    n->value = val;
    n->next = top;
    return n;      // new top
}

// Pop (remove from front)
struct node *pop(struct node *top) {
    struct node *temp = top->next;
    free(top);
    return temp;   // new top
}`,
  },
  {
    title: "File I/O",
    tag: "I/O",
    code: `FILE *f = fopen("data.txt", "r");
if (f == NULL) { perror("Error"); return 1; }

// Read until EOF
while (!feof(f) && !ferror(f)) {
    fscanf(f, "%d", &n);
}

// feof returns true AFTER a failed read
// Write
fprintf(f, "%d\\n", n);

fclose(f);  // always close

// qsort (stdlib.h)
qsort(arr, n, sizeof(int), cmp_func);`,
  },
];

export function CheatsheetContent() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold">C Syntax Cheatsheet</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Quick reference for common C patterns
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{section.title}</CardTitle>
                  <Badge variant="outline" className="text-[10px]">
                    {section.tag}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="text-[11px] leading-relaxed font-mono bg-muted rounded-lg p-3 overflow-x-auto whitespace-pre">
                  {section.code}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
