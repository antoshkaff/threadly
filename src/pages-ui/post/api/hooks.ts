import { useQuery } from '@tanstack/react-query';
import { POST_KEYS } from '@/entities/post/api/keys';
import { getPost } from '@/pages-ui/post/api/api';
import { PublicPost } from '@shared/types/post';

export const usePostDetails = ({
    postId,
    initialPost,
}: {
    postId: string;
    initialPost: { post: PublicPost };
}) => {
    return useQuery({
        queryKey: POST_KEYS.post(postId),
        queryFn: () => getPost(postId),
        initialData: initialPost,
        select: (data) => data.post,
        refetchOnMount: false,
    });
};
