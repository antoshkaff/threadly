import { verifyAccess } from '@shared/jwt';
import { cookies } from 'next/headers';
import { ACCESS_COOKIE, ERROR_CODES } from '@shared/constants';
import { AppError } from '@server/modules/error/AppError';

export async function requireUserId() {
    const jar = await cookies();
    const token = jar.get(ACCESS_COOKIE)?.value;
    if (!token) throw new AppError(ERROR_CODES.unauthorized, 'unauthorized');
    const payload = await verifyAccess<{ sub: string }>(token);
    return payload.sub;
}
