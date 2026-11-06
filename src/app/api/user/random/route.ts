import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { AppError } from '@server/modules/error/AppError';
import { UserService } from '@server/modules/user/user.service';
import { ACCESS_COOKIE, ERROR_CODES } from '@shared/constants';
import { verifyAccess } from '@shared/jwt';

import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const limitParam = req.nextUrl.searchParams.get('limit');
    const limit = limitParam ? Number(limitParam) : 5;

    if (limitParam && Number.isNaN(limit)) {
      throw new AppError(ERROR_CODES.validation, 'Limit must be a number', 400);
    }

    const jar = await cookies();
    const token = jar.get(ACCESS_COOKIE)?.value;

    let viewerId: string | undefined;

    if (token) {
      try {
        const payload = await verifyAccess(token);
        viewerId = payload.sub;
      } catch {
        viewerId = undefined;
      }
    }

    const users = await UserService.getRandomUsers(limit, viewerId);

    return NextResponse.json(users, { status: 200 });
  } catch (e) {
    if (e instanceof AppError) {
      return NextResponse.json({ error: e.code, message: e.message }, { status: e.status });
    }

    return NextResponse.json({ error: 'internal', message: 'Server error' }, { status: 500 });
  }
}
