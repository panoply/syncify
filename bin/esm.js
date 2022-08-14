// Shim globals in esm bundle
import { fileURLToPath } from 'url';
import path from 'path';

const filename = () => fileURLToPath(import.meta.url);
const dirname = () => path.dirname(filename());

export const __dirname = /* @__PURE__ */ dirname();
export const __filename = /* @__PURE__ */ filename();
