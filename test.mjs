import path from 'path';
import { performance } from 'perf_hooks';
const src = '/Users/Panoply/Projects/syncify/tests/e2e/custom/source/views/templates/cart.json';
const iterations = 1000000;

function lastPath (path) {
  // Handle array input
  if (Array.isArray(path)) {
    return path.map(p => lastPath(p)).filter(result => result !== null);
  }

  // Ensure path is a string and non-empty
  if (typeof path !== 'string' || path.length === 0) {
    return null;
  }

  // Remove trailing separator if present
  const cleanPath = path.endsWith(path.sep) ? path.slice(0, -1) : path;

  // Split path using OS-specific separator
  const parts = cleanPath.split(path.sep);

  // Ensure at least two components (directory + file)
  if (parts.length < 2) {
    return parts.length === 1 ? parts[0] : null;
  }

  // Join the last two components
  return `${parts[parts.length - 2]}${path.sep}${parts[parts.length - 1]}`;
}

let start = performance.now();
for (let i = 0; i < iterations; i++) {
  lastPath(src);
}
console.log(`Optimized lastPath: ${(performance.now() - start).toFixed(2)}ms`);

start = performance.now();
for (let i = 0; i < iterations; i++) {
  // Original lastPath implementation
  const dir = src.endsWith('/') ? path.dirname(src.slice(0, -1)) : path.dirname(src);
  const ender = dir.lastIndexOf('/') + 1;
  dir.slice(ender);
}
console.log(`Original lastPath: ${(performance.now() - start).toFixed(2)}ms`);
