import fs from "fs";

let ex = JSON.parse(fs.readFileSync("data/exercises.json", "utf8"));
const before = ex.length;

// 1. Delete exercises with '2026 Exam' tag
ex = ex.filter(e => !e.tags.includes("2026 Exam"));
const afterDelete = ex.length;

// 2. Merge 'Midterm 1 2024' and 'Midterm 1 2026' into 'Midterm 1'
ex.forEach(e => {
  e.tags = e.tags.map(t => {
    if (t === "Midterm 1 2024" || t === "Midterm 1 2026") return "Midterm 1";
    return t;
  });
  e.tags = [...new Set(e.tags)];
});

fs.writeFileSync("data/exercises.json", JSON.stringify(ex, null, 2));
console.log("Before:", before);
console.log("Deleted:", before - afterDelete, "(2026 Exam)");
console.log("After:", afterDelete);
console.log("Renamed Midterm 1 2024 + Midterm 1 2026 -> Midterm 1");
