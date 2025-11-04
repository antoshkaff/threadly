import { NextResponse } from 'next/server';
import { AppError } from '@server/modules/error/AppError';
import { UserService } from '@server/modules/user/user.service';
import { LoginInput } from '@shared/contracts/user.dto';
import { ACCESS_COOKIE, ACCESS_MAX_AGE } from '@shared/constants';

export async function POST(req: Request) {
    const json = await req.json().catch(() => null);
    const parsed = LoginInput.safeParse(json);
    if (!parsed.success) {
        return NextResponse.json(
            { code: 'validation', details: parsed.error.format() },
            { status: 400 },
        );
    }

    try {
        const res = await UserService.login(parsed.data);
        const resp = NextResponse.json(
            { user: res.user, accessToken: res.accessToken },
            { status: 201 },
        );

        resp.cookies.set(ACCESS_COOKIE, res.accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: ACCESS_MAX_AGE,
        });

        return resp;
    } catch (e: unknown) {
        if (e instanceof AppError) {
            return NextResponse.json(
                { code: e.code, message: e.message },
                { status: e.status },
            );
        }
        return NextResponse.json(
            { error: 'internal', message: 'Server error' },
            { status: 500 },
        );
    }
}
