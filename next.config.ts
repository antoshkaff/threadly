import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL(
                'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?semt=ais_hybrid&w=740&q=80',
            ),
        ],
    },
    outputFileTracingIncludes: {
        '/api/**/*': ['./node_modules/.prisma/client/**/*'],
        '/*': ['./node_modules/.prisma/client/**/*'],
    },
};

export default nextConfig;
