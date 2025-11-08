import { verifyAccess } from '@shared/jwt';
import { cookies } from 'next/headers';
import { ACCESS_COOKIE } from '@shared/constants';

export async function requireUserId() {
    const jar = await cookies();
    const token = jar.get(ACCESS_COOKIE)?.value;
    if (!token) throw new Error('unauthorized');
    const payload = await verifyAccess<{ sub: string }>(token);
    return payload.sub;
}
