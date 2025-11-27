import { PublicPost } from '@shared/types/post';
import { PublicComment } from '@shared/types/comment';
import { PublicUser } from '@shared/types/user';

export type SearchResponse = {
    posts: PublicPost[];
    comments: PublicComment[];
    users: PublicUser[];
};

export type Filters = ('posts' | 'comments' | 'users')[];

export type TabsValue = 'All' | 'Posts' | 'Comments' | 'Users';
