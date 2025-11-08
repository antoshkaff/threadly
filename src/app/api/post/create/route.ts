import { CreatePostInput } from '@shared/contracts/post.dto';
import { NextResponse } from 'next/server';
import { PostService } from '@server/modules/post/post.service';
import { requireUserId } from '@shared/types/requireUserId';
import { AppError } from '@server/modules/error/AppError';
import { ERROR_CODES } from '@shared/constants';

export async function POST(req: Request) {
    const json = await req.json().catch(() => null);
    const parsed = CreatePostInput.safeParse(json);
    if (!parsed.success) {
        return NextResponse.json(
            { error: ERROR_CODES.validation, details: parsed.error.format() },
            { status: 400 },
        );
    }

    try {
        const userId = await requireUserId();

        const post = await PostService.create(userId, parsed.data);
        return NextResponse.json({ post }, { status: 201 });
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
