import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL(
                'https://2bphz9kjjabykewm.public.blob.vercel-storage.com/***',
            ),
        ],
    },
};

export default nextConfig;
