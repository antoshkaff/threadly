import { cookies } from 'next/headers';
import { cache } from 'react';

import { toPublicDTO, UserDAO } from '@server/modules/user/user.dao';
import { ACCESS_COOKIE } from '@shared/constants';
import { verifyAccess } from '@shared/jwt';

export const getServerUser = cache(async () => {
  const jar = await cookies();
  const token = jar.get(ACCESS_COOKIE)?.value;

  if (!token) return null;

  try {
    const payload = await verifyAccess(token);
    if (!payload.sub) return null;
    const user = await UserDAO.findById(payload.sub);
    return user ? toPublicDTO(user) : null;
  } catch {
    return null;
  }
});
