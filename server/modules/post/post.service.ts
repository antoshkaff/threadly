import { prisma } from '@server/shared/prisma';
import { AppError } from '@server/modules/error/AppError';
import { ERROR_CODES } from '@shared/constants';
import { PostDAO } from './post.dao';
import { toPublicPost } from './post.dao';
import type { PublicPost } from '@shared/types/post';
import type { CreatePostInput } from '@shared/contracts/post.dto';
import { UserDAO } from '@server/modules/user/user.dao';

type PublicPostWithMeta = PublicPost & { isLiked: boolean };

const getPublicPostWithMeta = async (
    postId: string,
    viewerId?: string,
): Promise<PublicPostWithMeta> => {
    const post = await PostDAO.findById(postId);
    if (!post) {
        throw new AppError(ERROR_CODES.not_found, 'Post not found', 404);
    }

    const base = toPublicPost(post);

    let isLiked = false;
    if (viewerId) {
        const like = await PostDAO.hasLike(postId, viewerId);
        isLiked = !!like;
    }

    return {
        ...base,
        isLiked,
    };
};

export const PostService = {
    async create(
        authorId: string,
        input: CreatePostInput,
    ): Promise<PublicPostWithMeta> {
        const post = await PostDAO.create({
            authorId,
            content: input.content,
            images: input.images ?? [],
        });

        const base = toPublicPost(post);

        return {
            ...base,
            isLiked: false,
        };
    },

    async getById(
        postId: string,
        viewerId?: string,
    ): Promise<PublicPostWithMeta> {
        return getPublicPostWithMeta(postId, viewerId);
    },

    async feed(params: {
        viewerId?: string;
        cursor?: string;
        limit?: number;
        username?: string;
        subscriptionsOnly?: boolean;
    }): Promise<{ items: PublicPostWithMeta[]; nextCursor?: string }> {
        const limit = Math.min(Math.max(params.limit ?? 20, 1), 50);

        let authorId: string | undefined;
        let onlyFollowing = false;

        if (params.username) {
            const user = await UserDAO.findByUsername(params.username);
            if (!user) {
                throw new AppError(
                    ERROR_CODES.not_found,
                    'User not found',
                    404,
                );
            }
            authorId = user.id;
        } else if (params.subscriptionsOnly && params.viewerId) {
            onlyFollowing = true;
        }

        const rows = await PostDAO.listFeed({
            cursor: params.cursor,
            limit,
            authorId,
            onlyFollowing,
            viewerId: params.viewerId,
        });

        const hasMore = rows.length > limit;
        const slice = hasMore ? rows.slice(0, -1) : rows;

        const base = slice.map((post) => toPublicPost(post));

        if (!params.viewerId || base.length === 0) {
            return {
                items: base.map((p) => ({ ...p, isLiked: false })),
                nextCursor: hasMore ? slice[slice.length - 1].id : undefined,
            };
        }

        const likes = await prisma.postLike.findMany({
            where: {
                userId: params.viewerId,
                postId: { in: base.map((p) => p.id) },
            },
            select: { postId: true },
        });

        const likedSet = new Set(likes.map((l) => l.postId));

        const items: PublicPostWithMeta[] = base.map((p) => ({
            ...p,
            isLiked: likedSet.has(p.id),
        }));

        return {
            items,
            nextCursor: hasMore ? slice[slice.length - 1].id : undefined,
        };
    },

    async toggleLike(
        userId: string,
        postId: string,
    ): Promise<PublicPostWithMeta> {
        const post = await PostDAO.findById(postId);
        if (!post) {
            throw new AppError(ERROR_CODES.not_found, 'Post not found', 404);
        }

        const has = await PostDAO.hasLike(postId, userId);

        if (!has) {
            await prisma.$transaction([
                PostDAO.addLike(postId, userId),
                PostDAO.incLikes(postId, 1),
            ]);
        } else {
            await prisma.$transaction([
                PostDAO.removeLike(postId, userId),
                PostDAO.incLikes(postId, -1),
            ]);
        }

        return getPublicPostWithMeta(postId, userId);
    },

    async share(userId: string, postId: string): Promise<PublicPostWithMeta> {
        const post = await PostDAO.findById(postId);
        if (!post) {
            throw new AppError(ERROR_CODES.not_found, 'Post not found', 404);
        }

        await prisma.$transaction([
            PostDAO.createShare(postId, userId),
            PostDAO.incShares(postId, 1),
        ]);

        return getPublicPostWithMeta(postId, userId);
    },

    async delete(postId: string, userId: string): Promise<void> {
        const post = await PostDAO.findById(postId);

        if (!post) {
            throw new AppError(ERROR_CODES.not_found, 'Post not found', 404);
        }

        if (post.author.id !== userId) {
            throw new AppError(
                ERROR_CODES.forbidden,
                'You are not allowed to delete this post',
                403,
            );
        }

        await PostDAO.delete(postId);
    },
};
