import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { AppError } from '@server/modules/error/AppError';
import { PostService } from '@server/modules/post/post.service';
import { ACCESS_COOKIE, ERROR_CODES } from '@shared/constants';
import { requireUserId } from '@shared/requireUserId';

import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const jar = await cookies();
    const token = jar.get(ACCESS_COOKIE)?.value;

    if (!token) {
      throw new AppError(ERROR_CODES.unauthorized, 'Unauthorized', 401);
    }

    const userId = await requireUserId();
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      throw new AppError(ERROR_CODES.validation, 'Id is required', 401);
    }

    const post = await PostService.share(userId!, id);

    const url = new URL(`/post/${id}`, process.env.NEXT_PUBLIC_APP_URL).toString();

    return NextResponse.json({ post, url }, { status: 200 });
  } catch (e) {
    if (e instanceof AppError) {
      return NextResponse.json({ error: e.code, message: e.message }, { status: e.status });
    }

    return NextResponse.json({ error: 'internal', message: 'Server error' }, { status: 500 });
  }
}
