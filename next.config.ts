import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '2bphz9kjjabykewm.public.blob.vercel-storage.com',
                pathname: '/**',
            },
        ],
    },
    outputFileTracingIncludes: {
        '/api/**/*': ['./node_modules/.prisma/client/**/*'],
        '/*': ['./node_modules/.prisma/client/**/*'],
    },
};

export default nextConfig;
