import type { Metadata } from 'next';
import { baseFetch } from '@/shared/api/baseFetch';
import type { PublicPost } from '@shared/types/post';
import { API } from '@/shared/constants/api';
import { PostPage } from '@/pages_/post';
import { PublicComment } from '@shared/types/comment';
import { APP_URL } from '@shared/constants';

type Params = { postId: string };

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { postId } = await params;

    let post: PublicPost | null = null;

    try {
        const res = await baseFetch<{ post: PublicPost }>(
            API.POST_DETAILS(postId),
        );
        post = res.post;
    } catch {
        return {
            title: 'Post not found',
            description: 'This post does not exist or is no longer available.',
        };
    }

    if (!post) {
        return {
            title: 'Post not found',
            description: 'This post does not exist or is no longer available.',
        };
    }

    const url = `${APP_URL}/post/${post.id}`;

    const raw =
        (post.content && post.content.trim()) ||
        `Post by @${post.author.username}`;
    const clean = raw.replace(/\s+/g, ' ').trim();
    const description =
        clean.length > 160
            ? clean.slice(0, 157).replace(/\s+\S*$/, '') + '…'
            : clean;

    const title = `Post by @${post.author.username}`;

    const ogImages: string[] = [];

    if (Array.isArray(post.images) && post.images.length > 0) {
        for (const src of post.images) {
            if (!src) continue;
            ogImages.push(src.startsWith('http') ? src : `${APP_URL}${src}`);
        }
    } else if (post.author.avatarUrl) {
        ogImages.push(
            post.author.avatarUrl.startsWith('http')
                ? post.author.avatarUrl
                : `${APP_URL}${post.author.avatarUrl}`,
        );
    }

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: 'article',
            url,
            title,
            description,
            siteName: 'Threadly',
            images: ogImages.map((img) => ({
                url: img,
                width: 1200,
                height: 630,
                alt: `Post by @${post.author.username}`,
            })),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ogImages,
        },
    };
}

const Page = async ({ params }: { params: Promise<Params> }) => {
    const postId = (await params).postId;
    const postPromise = baseFetch<{ post: PublicPost }>(
        API.POST_DETAILS(postId),
    );

    const commentsPromise = baseFetch<{
        items: PublicComment[];
        nextCursor: string | null;
    }>(API.COMMENTS_GET(postId, null, 10));

    const [post, comments] = await Promise.all([postPromise, commentsPromise]);
    return (
        <PostPage
            postId={postId}
            initialPost={post}
            initialComments={comments.items}
        />
    );
};

export default Page;
