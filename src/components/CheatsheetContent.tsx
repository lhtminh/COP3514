"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const sections = [
  {
    title: "Basic Structure",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // code here
    return 0;
}`,
  },
  {
    title: "Data Types",
    code: `char c = 'A';           // 1 byte
int n = 42;              // 4 bytes (typically)
float f = 3.14f;         // 4 bytes
double d = 3.14159;      // 8 bytes
long long ll = 123456LL; // 8 bytes
unsigned int u = 100;    // no negative values
_Bool b = 1;             // 0 or 1 (C99+)`,
  },
  {
    title: "printf Format Specifiers",
    code: `%d, %i   — int (decimal)
%u       — unsigned int
%ld, %li — long int
%lld     — long long int
%f       — float/double (default 6 decimals)
%.2f     — float with 2 decimal places
%e       — scientific notation
%c       — char
%s       — string (char*)
%p       — pointer address
%x, %X   — hex (lowercase/uppercase)
%o       — octal
%%       — literal percent sign
%5d      — right-align in 5-char field
%-5d     — left-align in 5-char field
%05d     — zero-padded 5-char field`,
  },
  {
    title: "scanf Input",
    code: `int n;
scanf("%d", &n);        // read int

char s[100];
scanf("%s", s);         // read word (no spaces)
fgets(s, 100, stdin);   // read entire line

double d;
scanf("%lf", &d);       // read double

char c;
scanf(" %c", &c);       // space skips whitespace`,
  },
  {
    title: "Arrays",
    code: `int arr[5] = {1, 2, 3, 4, 5};
int zeros[100] = {0};          // all zeros
int n = sizeof(arr) / sizeof(arr[0]); // array length

// 2D array
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};`,
  },
  {
    title: "Strings (char arrays)",
    code: `char s[] = "hello";
int len = strlen(s);           // 5
strcmp(a, b);                   // 0 if equal
strcpy(dest, src);             // copy string
strcat(dest, src);             // concatenate
strncpy(dest, src, n);         // copy n chars
char *p = strstr(hay, needle); // find substring
char *tok = strtok(s, " ");   // tokenize
atoi("42");                    // string to int
atof("3.14");                  // string to double`,
  },
  {
    title: "Pointers",
    code: `int x = 10;
int *p = &x;    // p points to x
*p = 20;        // x is now 20

// Dynamic allocation
int *arr = malloc(n * sizeof(int));
int *arr2 = calloc(n, sizeof(int)); // zero-initialized
arr = realloc(arr, new_size * sizeof(int));
free(arr);      // always free when done

// Pointer arithmetic
*(arr + i)  is equivalent to  arr[i]`,
  },
  {
    title: "Control Flow",
    code: `// if-else
if (x > 0) { ... }
else if (x == 0) { ... }
else { ... }

// switch
switch (c) {
    case 'a': ...; break;
    case 'b': ...; break;
    default:  ...; break;
}

// loops
for (int i = 0; i < n; i++) { ... }
while (condition) { ... }
do { ... } while (condition);

// ternary
int max = (a > b) ? a : b;`,
  },
  {
    title: "Functions",
    code: `// Declaration (prototype)
int add(int a, int b);

// Definition
int add(int a, int b) {
    return a + b;
}

// Pass by reference (using pointers)
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
swap(&x, &y);

// Array parameter (decays to pointer)
void print_arr(int arr[], int n) { ... }`,
  },
  {
    title: "Structs",
    code: `typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

Student s = {"Alice", 20, 3.8};
s.age = 21;

// Pointer to struct
Student *p = &s;
p->age = 22;  // same as (*p).age`,
  },
  {
    title: "File I/O",
    code: `FILE *f = fopen("data.txt", "r");  // "w", "a", "rb", "wb"
if (f == NULL) { perror("Error"); return 1; }

// Read
char line[256];
while (fgets(line, sizeof(line), f)) { ... }
fscanf(f, "%d", &n);

// Write
fprintf(f, "value: %d\\n", n);
fputs("hello\\n", f);

fclose(f);`,
  },
  {
    title: "Common <stdlib.h>",
    code: `abs(n)              // absolute value
rand() % n          // random 0..n-1
srand(time(NULL))   // seed random

qsort(arr, n, sizeof(int), compare);
// compare function:
int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

exit(0);            // terminate program
system("pause");    // Windows pause`,
  },
  {
    title: "Common <math.h>",
    code: `// Compile with: gcc ... -lm
sqrt(x)    pow(x, y)    fabs(x)
ceil(x)    floor(x)     round(x)
log(x)     log10(x)     exp(x)
sin(x)     cos(x)       tan(x)
M_PI       // 3.14159... (may need #define)`,
  },
];

export function CheatsheetContent() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">C Syntax Cheatsheet</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.title} className="p-4">
              <h3 className="font-semibold text-sm mb-2">{section.title}</h3>
              <pre className="text-xs font-mono bg-muted rounded-md p-3 overflow-x-auto whitespace-pre">
                {section.code}
              </pre>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
