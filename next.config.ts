import os from "node:os";
import path from "node:path";
import type { NextConfig } from "next";

// Ensure a safe cache directory for native bindings on Windows
if (!process.env.SWC_NATIVE_BINDING_CACHE) {
  process.env.SWC_NATIVE_BINDING_CACHE = path.join(os.homedir(), ".swc-cache");
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
