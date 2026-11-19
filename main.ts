// gta6-meme-x-01 entry program (Node 22, standard library only).
//
// The entry itself is a post on X: a GTA 6 meme whose picture carries the
// make.fun ghost, posted publicly with make.fun and the play code in its
// text. This program's whole job is to hand the post's address to the
// grader: it copies POST.json from the repository root into the output
// directory, where the gate reads it. Before copying, it checks the file
// is a JSON object with a string "url", so a malformed hand-in fails
// loudly here instead of silently at the gate. The copy itself is byte
// for byte, so both grader runs produce identical output.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const postFile = join(botDir, "POST.json");
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(postFile, "utf8"));
} catch (err) {
  console.error(`POST.json is not readable JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (
  typeof parsed !== "object" || parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  console.error('POST.json must be a JSON object with a string "url".');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(postFile, join(outputDir, "POST.json"));
