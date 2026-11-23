// One Letter for Your Day — make.fun bounty entry.
//
// The entry is exactly one letter, standing for the word that describes
// my day. Today's word is "unhinged": a day that started with a plan and
// ended with none of it surviving contact with reality, in the best way.
// The letter U is the whole entry — no word, no gloss, no punctuation.

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LETTER = "U";

// The gate demands exactly one character, A–Z, and nothing else —
// no word, no gloss, no punctuation, no trailing newline.
if (!/^[A-Z]$/.test(LETTER)) {
  throw new Error(`entry letter must be a single A-Z character, got ${JSON.stringify(LETTER)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LETTER, { encoding: "utf8" });
chmodSync(outPath, 0o644);

// Read back and verify: exactly one byte, the letter, nothing else.
const written = readFileSync(outPath, "utf8");
if (written !== LETTER) {
  throw new Error(`entry.txt mismatch: expected ${JSON.stringify(LETTER)}, got ${JSON.stringify(written)}`);
}
