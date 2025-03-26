import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // TODO: add production domain
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
