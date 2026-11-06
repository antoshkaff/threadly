import type { SearchResponse } from '@/entities/search';
import { UserCardInline } from '@/entities/user';
import { SEARCH_TABS } from '@/features/search';
import { CommentCard } from '@/widgets/comment';
import { PostCard } from '@/widgets/post';

import type { PublicUser } from '@shared/types/user';

export const SEARCH_TABS_CONFIG = [
  {
    value: SEARCH_TABS.ALL,
    content: SEARCH_TABS.ALL,
    render: (data: SearchResponse, user: PublicUser | null) => (
      <ul className="flex flex-col gap-4">
        {data.posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} user={user} />
          </li>
        ))}
        {data.comments.map((comment) => (
          <li key={comment.id}>
            <CommentCard comment={comment} user={user} />
          </li>
        ))}
        {data.users.map((user_) => (
          <li
            key={user_.id}
            className="rounded-3xl border border-[--border] bg-[var(--background-second)] p-3"
          >
            <UserCardInline user={user_} />
          </li>
        ))}
      </ul>
    ),
  },
  {
    value: SEARCH_TABS.POSTS,
    content: SEARCH_TABS.POSTS,
    render: (data: SearchResponse, user: PublicUser | null) => (
      <ul className="flex flex-col gap-4">
        {data.posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} user={user} />
          </li>
        ))}
      </ul>
    ),
  },
  {
    value: SEARCH_TABS.COMMENTS,
    content: SEARCH_TABS.COMMENTS,
    render: (data: SearchResponse, user: PublicUser | null) => (
      <ul className="flex flex-col gap-4">
        {data.comments.map((comment) => (
          <li key={comment.id}>
            <CommentCard comment={comment} user={user} />
          </li>
        ))}
      </ul>
    ),
  },
  {
    value: SEARCH_TABS.USERS,
    content: SEARCH_TABS.USERS,
    render: (data: SearchResponse) => (
      <ul className="flex flex-col gap-4">
        {data.users.map((user_) => (
          <li
            key={user_.id}
            className="rounded-3xl border border-[--border] bg-[var(--background-second)] p-3"
          >
            <UserCardInline user={user_} />
          </li>
        ))}
      </ul>
    ),
  },
] as const;
