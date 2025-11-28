import { NextRequest, NextResponse } from 'next/server';
import { CommentService } from '@server/modules/comment/comment.service';
import { AppError } from '@server/modules/error/AppError';
import { ERROR_CODES } from '@shared/constants';
import { requireUserId } from '@shared/requireUserId';

type Params = { postId: string };

export async function GET(req: NextRequest, ctx: { params: Promise<Params> }) {
    const { postId } = await ctx.params;

    const cursor = req.nextUrl.searchParams.get('cursor') || undefined;
    const limit = req.nextUrl.searchParams.get('limit');

    try {
        const data = await CommentService.listForPost({
            postId,
            cursor,
            limit: limit ? Number(limit) : undefined,
        });

        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        if (e instanceof AppError) {
            return NextResponse.json(
                { error: e.code, message: e.message },
                { status: e.status },
            );
        }

        return NextResponse.json(
            { error: ERROR_CODES.internal, message: 'Internal error' },
            { status: 500 },
        );
    }
}

export async function POST(req: NextRequest, ctx: { params: Promise<Params> }) {
    const { postId } = await ctx.params;
    const json = await req.json().catch(() => null);

    const content = json?.content ?? '';

    try {
        const userId = await requireUserId();

        const comment = await CommentService.create(userId!, {
            postId,
            content,
        });

        return NextResponse.json({ comment }, { status: 201 });
    } catch (e) {
        console.log(e);
        if (e instanceof AppError) {
            return NextResponse.json(
                { error: e.code, message: e.message },
                { status: e.status },
            );
        }

        return NextResponse.json(
            { error: ERROR_CODES.internal, message: 'Internal error' },
            { status: 500 },
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const commentId = req.nextUrl.searchParams.get('commentId');

        if (!commentId) {
            throw new AppError(
                ERROR_CODES.validation,
                'Comment id is required',
                400,
            );
        }

        const userId = await requireUserId();
        if (!userId) {
            throw new AppError(ERROR_CODES.unauthorized, 'Unauthorized', 401);
        }

        const { postId } = await CommentService.delete(commentId, userId);

        return NextResponse.json({ postId, commentId }, { status: 200 });
    } catch (e) {
        console.log(e);
        if (e instanceof AppError) {
            return NextResponse.json(
                { error: e.code, message: e.message },
                { status: e.status },
            );
        }

        return NextResponse.json(
            { error: ERROR_CODES.internal, message: 'Internal error' },
            { status: 500 },
        );
    }
}
