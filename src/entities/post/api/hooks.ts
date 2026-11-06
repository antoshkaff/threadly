import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deletePost, getPostsInfinity } from '@/entities/post/api/api';
import { POST_KEYS } from '@/entities/post/api/keys';

import type { PublicPost } from '@shared/types/post';
import type { InfiniteData } from '@tanstack/query-core';

export const useInfinityPosts = ({
  username,
  onlyFollowing,
}: {
  username?: string;
  onlyFollowing?: boolean;
}) => {
  return useInfiniteQuery(
    infiniteQueryOptions({
      queryKey: POST_KEYS.postList(username, onlyFollowing),

      queryFn: ({ pageParam }) => getPostsInfinity({ pageParam, username, onlyFollowing }),

      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),
  );
};

type PostsPage = {
  items: PublicPost[];
  nextCursor?: string | null;
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: POST_KEYS.delete,
    mutationFn: deletePost,
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey: POST_KEYS.postList() });

      const prev = queryClient.getQueryData<InfiniteData<PostsPage>>(POST_KEYS.postList());

      if (prev) {
        const next: InfiniteData<PostsPage> = {
          pageParams: [...prev.pageParams],
          pages: prev.pages.map((page) => ({
            ...page,
            items: page.items.filter((post) => post.id !== data.postId),
          })),
        };

        queryClient.setQueryData(POST_KEYS.postList(), next);
      }

      queryClient.removeQueries({
        queryKey: POST_KEYS.post(data.postId),
      });

      return { prev };
    },
  });
};
