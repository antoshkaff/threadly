import { NextRequest, NextResponse } from 'next/server';
import { AppError } from '@server/modules/error/AppError';
import { PostService } from '@server/modules/post/post.service';
import { ERROR_CODES } from '@shared/constants';
import { requireUserId } from '@shared/requireUserId';

export async function GET(req: NextRequest) {
    try {
        const postId = req.nextUrl.searchParams.get('postId');
        if (!postId) {
            throw new AppError(ERROR_CODES.validation, 'Post id is required');
        }

        const post = await PostService.getById(postId);

        return NextResponse.json({ post: post }, { status: 200 });
    } catch (e) {
        if (e instanceof AppError) {
            return NextResponse.json(
                { error: e.code, message: e.message },
                { status: e.status },
            );
        }

        return NextResponse.json({ error: 'internal' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const postId = req.nextUrl.searchParams.get('postId');
        if (!postId) {
            throw new AppError(
                ERROR_CODES.validation,
                'Post id is required',
                400,
            );
        }

        const userId = await requireUserId();
        if (!userId) {
            throw new AppError(ERROR_CODES.unauthorized, 'Unauthorized', 401);
        }

        await PostService.delete(postId, userId);

        return NextResponse.json({ postId: postId }, { status: 200 });
    } catch (e) {
        if (e instanceof AppError) {
            return NextResponse.json(
                { error: e.code, message: e.message },
                { status: e.status },
            );
        }

        return NextResponse.json({ error: 'internal' }, { status: 500 });
    }
}
