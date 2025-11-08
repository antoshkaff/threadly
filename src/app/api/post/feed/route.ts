import { AppError } from '@server/modules/error/AppError';
import { NextResponse } from 'next/server';
import { PostService } from '@server/modules/post/post.service';
import { cookies } from 'next/headers';
import { ACCESS_COOKIE, ERROR_CODES } from '@shared/constants';
import { verifyAccess } from '@shared/jwt';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get('cursor') ?? undefined;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Number(limitParam) : undefined;

    try {
        const jar = await cookies();
        const token = jar.get(ACCESS_COOKIE)?.value;

        if (!token) {
            throw new AppError(ERROR_CODES.unauthorized, 'Unauthorized', 401);
        }

        const { sub } = await verifyAccess(token);

        if (!sub) {
            throw new AppError(ERROR_CODES.unauthorized, 'Unauthorized', 401);
        }

        const data = await PostService.feed({
            viewerId: sub,
            cursor,
            limit,
        });

        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        if (e instanceof AppError) {
            return NextResponse.json(
                { error: e.code, message: e.message },
                { status: e.status },
            );
        }

        console.error(e);
        return NextResponse.json(
            { error: 'internal', message: 'Server error' },
            { status: 500 },
        );
    }
}
