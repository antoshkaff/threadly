import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';
import { PublicPost } from '@shared/types/post';

export const uploadImages = async (files: File[]) => {
    const fd = new FormData();
    files.forEach((f) => fd.append('files', f));

    const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
        credentials: 'include',
    });
    if (!res.ok) throw await res.json().catch(() => new Error('upload failed'));
    return res.json() as Promise<{ urls: string[] }>;
};

export const createPost = async (data: {
    content: string;
    images: string[];
}) => {
    return await baseFetch<{ post: PublicPost }>(API.CREATE_POST, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};
