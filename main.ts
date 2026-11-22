// make.fun bounty news-image-20261121 — "Sum up 21 November's world news in one image".
//
// The entry is the committed poster, entry.png, which sums up Saturday 21 November 2026 in six
// stories. The grader runs this program in a sandbox with no network, a read-only /bot and a
// writable /output, twice, and both runs must write the same bytes: copying the file is enough.
//
// Run it locally with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// The gate wants one whole image of at most 1 MiB: say what was written, and fail loudly if the
// committed poster ever goes missing so a broken run is never mistaken for a good one.
const { size } = statSync(target);
if (size > 1024 * 1024) throw new Error(`entry.png is ${size} bytes, over the 1 MiB cap`);
console.log(`wrote ${target} (${size} bytes)`);
