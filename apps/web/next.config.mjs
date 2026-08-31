/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ddu-focus/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
