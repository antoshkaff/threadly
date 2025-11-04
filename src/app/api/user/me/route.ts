import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAccess } from '@shared/jwt';
import { UserDAO, toPublicDTO } from '@server/modules/user/user.dao';

export async function GET(req: Request) {
    const jar = await cookies();
    let token = jar.get('accessToken')?.value;

    if (!token) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    try {
        const payload = await verifyAccess<{ sub: string }>(token);
        const user = await UserDAO.findById(payload.sub);
        if (!user) {
            return NextResponse.json({ error: 'not_found' }, { status: 404 });
        }

        return NextResponse.json({ user: toPublicDTO(user) });
    } catch {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
}
