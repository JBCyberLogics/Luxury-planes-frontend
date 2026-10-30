import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  experimental: { useTypeScriptCli: false },
};

export default nextConfig;
