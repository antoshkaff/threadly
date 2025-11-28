import { API } from '@/shared/constants/api';
import { baseFetch } from '@/shared/api/baseFetch';

export const uploadImages = async (
    files: File[] | File,
    kind: 'avatars' | 'posts',
) => {
    const fd = new FormData();

    if (Array.isArray(files)) {
        files.forEach((f) => fd.append('files', f));
    } else {
        fd.append('files', files);
    }

    return await baseFetch<{ urls: string[] }>(API.IMAGE_UPLOAD(kind), {
        method: 'POST',
        body: fd,
    });
};
