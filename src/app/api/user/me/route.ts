import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { UserDAO, toPublicDTO } from '@server/modules/user/user.dao';
import { ERROR_CODES } from '@shared/constants';
import { verifyAccess } from '@shared/jwt';

export async function GET() {
  const jar = await cookies();
  const token = jar.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ code: ERROR_CODES.unauthorized }, { status: 401 });
  }

  try {
    const payload = await verifyAccess(token);

    if (!payload.sub) {
      return NextResponse.json({ code: ERROR_CODES.not_found }, { status: 404 });
    }

    const user = await UserDAO.findById(payload.sub);
    if (!user) {
      return NextResponse.json({ code: ERROR_CODES.not_found }, { status: 404 });
    }

    return NextResponse.json({ user: toPublicDTO(user) });
  } catch {
    return NextResponse.json({ code: ERROR_CODES.unauthorized }, { status: 401 });
  }
}
