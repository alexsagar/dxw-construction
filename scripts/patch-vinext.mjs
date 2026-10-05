import fs from 'node:fs';
import path from 'node:path';

const imageShimPath = path.resolve('node_modules/vinext/dist/shims/image.js');

// 1. Fail immediately if file does not exist
if (!fs.existsSync(imageShimPath)) {
  console.error(`[patch-vinext] ERROR: Target file not found: ${imageShimPath}`);
  console.error('[patch-vinext] Please ensure vinext is installed before running this script.');
  process.exit(1);
}

const normalizeEol = (str) => str.replace(/\r\n/g, '\n');
let content = normalizeEol(fs.readFileSync(imageShimPath, 'utf8'));

// Exact original patterns from vinext 1.0.1
const ORIGINAL_GENERATE_BLOCK = `function generateImageAttributes(src, width, quality = 75, sizes) {
\tif (sizes) {
\t\tconst viewportPercentages = Array.from(sizes.matchAll(/(^|\\s)(1?\\d?\\d)vw/g), (match) => Number.parseInt(match[2], 10));
\t\tconst minimumWidth = viewportPercentages.length > 0 ? RESPONSIVE_WIDTHS[0] * (Math.min(...viewportPercentages) * .01) : 0;
\t\tconst candidates = ALL_IMAGE_WIDTHS.filter((candidateWidth) => candidateWidth >= minimumWidth);
\t\treturn {
\t\t\tsrc: imageOptimizationUrl(src, candidates[candidates.length - 1], quality),
\t\t\tsrcSet: candidates.map((candidateWidth) => \`\${imageOptimizationUrl(src, candidateWidth, quality)} \${candidateWidth}w\`).join(", ")
\t\t};
\t}
\tconst widths = getImageWidths(width);`;

const ORIGINAL_IMAGE_LINE =
  'const optimizedAttributes = imgWidth && !fill && !skipOptimization ? generateImageAttributes(src, imgWidth, imgQuality, sizes) : void 0;';

const ORIGINAL_GET_IMAGE_PROPS_LINE =
  'const optimizedAttributes = imgWidth && !fill && !skipOpt ? generateImageAttributes(resolvedSrc, imgWidth, imgQuality, sizes) : null;';

// Target patched patterns
const PATCHED_GENERATE_BLOCK = `function generateImageAttributes(src, width, quality = 75, sizes) {
\tif (sizes) {
\t\tconst viewportPercentages = Array.from(sizes.matchAll(/(^|\\s)(\\d+)vw/g), (match) => Number.parseInt(match[2], 10));
\t\tconst minimumWidth = viewportPercentages.length > 0 ? RESPONSIVE_WIDTHS[0] * (Math.min(...viewportPercentages) * .01) : 0;
\t\tconst candidates = ALL_IMAGE_WIDTHS.filter((candidateWidth) => candidateWidth >= minimumWidth);
\t\tconst selectedCandidates = candidates.length > 0 ? candidates : ALL_IMAGE_WIDTHS;
\t\treturn {
\t\t\tsrc: imageOptimizationUrl(src, selectedCandidates[selectedCandidates.length - 1], quality),
\t\t\tsrcSet: selectedCandidates.map((candidateWidth) => \`\${imageOptimizationUrl(src, candidateWidth, quality)} \${candidateWidth}w\`).join(", ")
\t\t};
\t}
\tconst widths = getImageWidths(width || RESPONSIVE_WIDTHS[RESPONSIVE_WIDTHS.length - 1]);`;

const PATCHED_IMAGE_LINE =
  'const optimizedAttributes = (imgWidth || fill) && !skipOptimization ? generateImageAttributes(src, imgWidth, imgQuality, sizes) : void 0;';

const PATCHED_GET_IMAGE_PROPS_LINE =
  'const optimizedAttributes = (imgWidth || fill) && !skipOpt ? generateImageAttributes(resolvedSrc, imgWidth, imgQuality, sizes) : null;';

// Required verification expressions
function verifyPatchedContent(str) {
  const checks = [
    { name: 'multi-digit vw parsing', test: str.includes('(\\d+)vw') },
    {
      name: 'safe fallback candidate handling',
      test: str.includes(
        'const selectedCandidates = candidates.length > 0 ? candidates : ALL_IMAGE_WIDTHS;'
      ),
    },
    {
      name: 'fill image srcSet generation in Image',
      test: str.includes('(imgWidth || fill) && !skipOptimization'),
    },
    {
      name: 'fill image srcSet generation in getImageProps',
      test: str.includes('(imgWidth || fill) && !skipOpt'),
    },
  ];

  for (const check of checks) {
    if (!check.test) {
      throw new Error(`[patch-vinext] Verification failed for: "${check.name}"`);
    }
  }
}

// 2. Distinguish states explicitly
const isAlreadyPatched =
  content.includes(PATCHED_GENERATE_BLOCK) &&
  content.includes(PATCHED_IMAGE_LINE) &&
  content.includes(PATCHED_GET_IMAGE_PROPS_LINE);

if (isAlreadyPatched) {
  try {
    verifyPatchedContent(content);
    console.log('[patch-vinext] vinext image shim is already patched (verified).');
    process.exit(0);
  } catch (err) {
    console.error(`[patch-vinext] Verification error on already-patched file: ${err.message}`);
    process.exit(1);
  }
}

const canPatch =
  content.includes(ORIGINAL_GENERATE_BLOCK) &&
  content.includes(ORIGINAL_IMAGE_LINE) &&
  content.includes(ORIGINAL_GET_IMAGE_PROPS_LINE);

if (canPatch) {
  content = content.replace(ORIGINAL_GENERATE_BLOCK, PATCHED_GENERATE_BLOCK);
  content = content.replace(ORIGINAL_IMAGE_LINE, PATCHED_IMAGE_LINE);
  content = content.replace(ORIGINAL_GET_IMAGE_PROPS_LINE, PATCHED_GET_IMAGE_PROPS_LINE);

  try {
    verifyPatchedContent(content);
  } catch (err) {
    console.error(`[patch-vinext] Post-replacement verification failed: ${err.message}`);
    process.exit(1);
  }

  fs.writeFileSync(imageShimPath, content, 'utf8');

  // Verify file written to disk
  const written = normalizeEol(fs.readFileSync(imageShimPath, 'utf8'));
  try {
    verifyPatchedContent(written);
    console.log('[patch-vinext] Successfully applied hardened patch to vinext image shim.');
    process.exit(0);
  } catch (err) {
    console.error(`[patch-vinext] Disk verification failed: ${err.message}`);
    process.exit(1);
  }
}

// State C: Unexpected vinext structure
console.error('[patch-vinext] FATAL: Unexpected vinext structure in node_modules/vinext/dist/shims/image.js.');
console.error('[patch-vinext] Expected original or already-patched patterns were not found.');
console.error('[patch-vinext] vinext internals may have changed in an incompatible way.');
console.error('[patch-vinext] Aborting install/build to prevent deploying blurry images.');
process.exit(1);
