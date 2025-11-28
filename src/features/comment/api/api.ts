import { baseFetch } from '@/shared/api/baseFetch';
import { PublicComment } from '@shared/types/comment';
import { API } from '@/shared/constants/api';

export const addComment = async ({
    postId,
    content,
}: {
    postId: string;
    content: string;
}) => {
    return await baseFetch<{ comment: PublicComment }>(
        API.COMMENT_CREATE(postId),
        {
            method: 'POST',
            body: JSON.stringify({ content: content }),
        },
    );
};
