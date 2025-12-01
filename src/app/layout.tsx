import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers/Providers';
import { Sidebar } from '@/widgets/side-bar';

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
    variable: '--font-plus-jakarta-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        default: 'Threadly – Social network for real-time conversations',
        template: '%s | Threadly',
    },
    description:
        'Threadly is a modern social network for sharing short posts, starting deep conversations, and staying up to date in real time with friends, creators, and communities.',
    keywords: [
        'Threadly',
        'social network',
        'microblogging',
        'short posts',
        'threads',
        'real-time feed',
        'follow creators',
        'online community',
    ],
    openGraph: {
        title: 'Threadly – Social network for real-time conversations',
        description:
            'Share short posts, build threaded conversations, and follow what matters to you in real time on Threadly.',
        type: 'website',
        siteName: 'Threadly',
        images: [
            {
                url: process.env.OG_IMAGE || '',
                width: 1200,
                height: 630,
                alt: 'Threadly – social network for real-time conversations',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Threadly – Social network for real-time conversations',
        description:
            'A fast, modern microblogging platform for threads, real-time updates, and community discussions.',
        images: [process.env.OG_IMAGE || ''],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${plus_Jakarta_Sans.variable} ${plus_Jakarta_Sans.variable} ${plus_Jakarta_Sans.className} antialiased transition-colors duration-200`}
            >
                <Providers>
                    <main className="min-h-screen grid grid-cols-[310px_1fr] max-xl:grid-cols-[200px_1fr] max-lg:grid-cols-1">
                        <Sidebar
                            className={
                                'row-span-full col-start-1 max-lg:hidden'
                            }
                        />
                        <section
                            className={
                                'col-start-2 transition-colors duration-200'
                            }
                        >
                            {children}
                        </section>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
