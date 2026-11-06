import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

import type { EditProfileInput } from '@shared/contracts/user.dto';
import type { PublicUser } from '@shared/types/user';

export const toggleFollow = (username: string) => {
  return baseFetch<{ followed: boolean }>(API.FOLLOW(username), {
    method: 'POST',
  });
};

export const editUser = async (data: EditProfileInput) => {
  return baseFetch<PublicUser>(API.USER_EDIT, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
