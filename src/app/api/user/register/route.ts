import { RegisterInput } from '@shared/contracts/user.dto';
import { NextResponse } from 'next/server';
import { UserService } from '@server/modules/user/user.service';
import { AppError } from '@server/modules/error/AppError';
import { ACCESS_COOKIE, ACCESS_MAX_AGE, ERROR_CODES } from '@shared/constants';

export async function POST(req: Request) {
    const json = await req.json().catch(() => null);
    const parsed = RegisterInput.safeParse(json);
    if (!parsed.success) {
        return NextResponse.json(
            { code: ERROR_CODES.validation, details: parsed.error.format() },
            { status: 400 },
        );
    }

    try {
        const res = await UserService.register(parsed.data);

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
            { code: ERROR_CODES.internal, message: 'Server error' },
            { status: 500 },
        );
    }
}
