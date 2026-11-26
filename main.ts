import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The Comment Above the Code — make.fun bounty
// One funny, painfully honest line imagining the comment a developer
// left above fragile production code. The magic number is load-bearing:
// 7 works, 8 doesn't, and nobody alive knows why. Don't ask.
// The entry must be a single line of 1-200 characters, written to
// /output/entry.txt with no trailing newline.

const LINE = "// Yes, the magic number is load-bearing. No, I don't know why 7 works and 8 doesn't. Don't ask.";

// Gate validation: 1-200 chars, a single line, no newline characters.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters");
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and verify byte-for-byte before reporting success.
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== LINE) {
  throw new Error("Verification failed: /output/entry.txt does not match the line byte-for-byte");
}
console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
console.log(LINE);
