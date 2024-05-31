import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Using next.config.mjs');
console.log('Filename:', __filename);
console.log('Dirname:', __dirname);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    console.log('Webpack config updated with alias:', config.resolve.alias['@']);
    return config;
  },
};

export default nextConfig;