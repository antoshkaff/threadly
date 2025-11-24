import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_COOKIE, ERROR_CODES } from '@shared/constants';
import { AppError } from '@server/modules/error/AppError';
import { requireUserId } from '@shared/requireUserId';
import { UserService } from '@server/modules/user/user.service';

export async function POST(req: NextRequest) {
    try {
        const jar = await cookies();
        const token = jar.get(ACCESS_COOKIE)?.value;

        if (!token) {
            throw new AppError(ERROR_CODES.unauthorized, 'Unauthorized', 401);
        }

        const userId = await requireUserId();
        const username = req.nextUrl.searchParams.get('username');

        if (!username) {
            throw new AppError(
                ERROR_CODES.validation,
                'Username is required',
                401,
            );
        }

        const result = await UserService.toggleFollowByUsername(
            userId!,
            username,
        );

        return NextResponse.json(result, { status: 200 });
    } catch (e) {
        if (e instanceof AppError) {
            return NextResponse.json(
                { error: e.code, message: e.message },
                { status: e.status },
            );
        }

        return NextResponse.json(
            { error: 'internal', message: 'Server error' },
            { status: 500 },
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const usernameParam = req.nextUrl.searchParams.get('username');

        if (!usernameParam) {
            throw new AppError(
                ERROR_CODES.validation,
                'Username is required',
                401,
            );
        }

        const followers =
            await UserService.getFollowersByUsername(usernameParam);

        return NextResponse.json(followers, { status: 200 });
    } catch (e) {
        if (e instanceof AppError) {
            return NextResponse.json(
                { error: e.code, message: e.message },
                { status: e.status },
            );
        }

        return NextResponse.json(
            { error: 'internal', message: 'Server error' },
            { status: 500 },
        );
    }
}
