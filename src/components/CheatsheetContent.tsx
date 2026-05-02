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
    title: "Functions",
    tag: "functions",
    code: `// Pass by reference (using pointers)
void swap(int *a, int *b) {
    int temp = *a; *a = *b; *b = temp;
}
swap(&x, &y);

// Return pointer from function
int *max(int *a, int *b) {
    return (*a > *b) ? a : b;
}`,
  },
  {
    title: "Function Pointers",
    tag: "functions",
    code: `// A function pointer stores the address
// of a function so you can call it later
//
// Syntax: return_type (*name)(param_types)
int (*fp)(int, int);  // declares fp

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

fp = add;            // point to add
fp(3, 4);            // calls add → 7
fp = mul;            // now point to mul
fp(3, 4);            // calls mul → 12

// As a parameter — lets a function accept
// different behaviors
int apply(int x, int y, int (*op)(int,int)) {
    return op(x, y);
}
apply(3, 4, add);    // 7
apply(3, 4, mul);    // 12

// Used by qsort to accept custom comparators
// qsort(arr, n, size, cmp_func_pointer);`,
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
    title: "File I/O — Open / Close",
    tag: "I/O",
    code: `// Modes: "r" read, "w" write (truncate),
//        "a" append, "rb"/"wb" binary
FILE *f = fopen("data.txt", "r");
if (f == NULL) { perror("Error"); return 1; }

// Always close when done
fclose(f);

// rewind — move back to start of file
rewind(f);  // same as fseek(f, 0, SEEK_SET)

// feof(f)  — true AFTER a read hits EOF
// ferror(f) — true if an error occurred`,
  },
  {
    title: "File I/O — fprintf / fscanf",
    tag: "I/O",
    code: `// fprintf — like printf, but writes to a file
FILE *f = fopen("out.txt", "w");
fprintf(f, "Name: %s\\n", name);
fprintf(f, "Score: %d\\n", score);
// printf(...) is just fprintf(stdout, ...)

// fscanf — like scanf, but reads from a file
FILE *f2 = fopen("in.txt", "r");
int id; double gpa; char name[50];
fscanf(f2, "%d %lf %s", &id, &gpa, name);

// Read all records until EOF
while (fscanf(f2, "%d %lf", &id, &gpa) == 2) {
    // process each record
}
// Returns number of items matched, or EOF`,
  },
  {
    title: "File I/O — fgets / fputs",
    tag: "I/O",
    code: `// fgets — reads ONE LINE (up to n-1 chars)
// Keeps the \\n at the end if present
char line[256];
fgets(line, 256, stdin);  // read from keyboard
fgets(line, 256, f);      // read from file

// fgets returns NULL on EOF or error
while (fgets(line, 256, f) != NULL) {
    // process each line
}

// fputs — writes a string to a file
// Does NOT add \\n automatically
fputs("hello\\n", f);       // write to file
fputs("hello\\n", stdout);  // write to screen
// puts("hello") adds \\n, fputs does NOT`,
  },
  {
    title: "File I/O — Common Pattern",
    tag: "I/O",
    code: `// Read structs from file, modify, write back
struct student { char name[50]; int grade; };

// 1. Read all records into an array
struct student arr[100]; int n = 0;
FILE *in = fopen("students.txt", "r");
while (fscanf(in, " %49s %d",
       arr[n].name, &arr[n].grade) == 2)
    n++;
fclose(in);

// 2. Process (e.g. curve grades)
for (int i = 0; i < n; i++)
    arr[i].grade += 5;

// 3. Write results to new file
FILE *out = fopen("curved.txt", "w");
for (int i = 0; i < n; i++)
    fprintf(out, "%s %d\\n",
            arr[i].name, arr[i].grade);
fclose(out);`,
  },
  {
    title: "Sorting — qsort",
    tag: "arrays",
    code: `#include <stdlib.h>

// Compare function (for int ascending)
int cmp(const void *a, const void *b) {
    return *(int *)a - *(int *)b;
}

int arr[] = {5, 2, 8, 1, 4};
int n = sizeof(arr)/sizeof(arr[0]);
qsort(arr, n, sizeof(int), cmp);
// arr is now {1, 2, 4, 5, 8}`,
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
