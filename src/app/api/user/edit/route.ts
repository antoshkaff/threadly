import { UserService } from '@server/modules/user/user.service';
import { AppError } from '@server/modules/error/AppError';
import { ACCESS_COOKIE, ERROR_CODES } from '@shared/constants';
import { EditProfileInput } from '@shared/contracts/user.dto';
import { requireUserId } from '@shared/requireUserId';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        const jar = await cookies();
        const token = jar.get(ACCESS_COOKIE)?.value;

        if (!token) {
            throw new AppError(ERROR_CODES.unauthorized, 'Unauthorized', 401);
        }

        const userId = await requireUserId();
        if (!userId) {
            throw new AppError(ERROR_CODES.unauthorized, 'Unauthorized', 401);
        }

        const body = await req.json();
        const parsed = EditProfileInput.safeParse(body);

        if (!parsed.success) {
            throw new AppError(ERROR_CODES.validation, 'Invalid input', 400);
        }

        const user = await UserService.editProfile(userId, parsed.data);

        const avatarUrl = user.avatarUrl || process.env.DEFAULT_AVATAR_URL;
        return NextResponse.json({ ...user, avatarUrl }, { status: 200 });
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
