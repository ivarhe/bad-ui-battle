import type { NextConfig } from "next";

// For GitHub Pages: if your repo is username.github.io, use ''
// Otherwise, use '/repository-name'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'tmp';
const basePath = process.env.NODE_ENV === 'production' && repoName !== 'username.github.io' 
  ? `/${repoName}` 
  : '';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath,
};

export default nextConfig;
