import { cookies } from 'next/headers';

import { AppError } from '@server/modules/error/AppError';
import { ACCESS_COOKIE, ERROR_CODES } from '@shared/constants';
import { verifyAccess } from '@shared/jwt';

export async function requireUserId() {
  const jar = await cookies();
  const token = jar.get(ACCESS_COOKIE)?.value;
  if (!token) throw new AppError(ERROR_CODES.unauthorized, 'unauthorized');
  const payload = await verifyAccess(token);
  return payload.sub;
}
