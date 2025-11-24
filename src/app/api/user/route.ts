import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_COOKIE, ERROR_CODES } from '@shared/constants';
import { AppError } from '@server/modules/error/AppError';
import { UserService } from '@server/modules/user/user.service';
import { requireUserId } from '@shared/requireUserId';
import { verifyAccess } from '@shared/jwt';

export async function GET(req: NextRequest) {
    try {
        let viewerId = null;

        const jar = await cookies();
        const token = jar.get(ACCESS_COOKIE)?.value;

        if (token) {
            const payload = await verifyAccess<{ sub: string }>(token);
            viewerId = payload.sub;
        }

        const username = req.nextUrl.searchParams.get('username');

        if (!username) {
            throw new AppError(
                ERROR_CODES.validation,
                'Username is required',
                401,
            );
        }

        const profile = await UserService.getProfileByUsername(
            username,
            viewerId,
        );

        const isOwner = viewerId === profile.id;

        return NextResponse.json({ ...profile, isOwner }, { status: 200 });
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
