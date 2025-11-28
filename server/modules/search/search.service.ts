import { PostDAO, toPublicPost } from '@server/modules/post/post.dao';
import { CommentDAO } from '@server/modules/comment/comment.dao';
import { UserDAO, toPublicDTO } from '@server/modules/user/user.dao';

type SearchType = 'posts' | 'comments' | 'users';

export class SearchService {
    static async search(params: {
        q: string;
        types?: SearchType[];
        limit?: number;
    }) {
        const { q } = params;
        const limit = Math.min(Math.max(params.limit ?? 10, 1), 50);
        const types =
            params.types && params.types.length
                ? params.types
                : (['posts', 'comments', 'users'] as SearchType[]);

        const [posts, comments, users] = await Promise.all([
            types.includes('posts')
                ? PostDAO.searchByContent(q, limit)
                : Promise.resolve([]),
            types.includes('comments')
                ? CommentDAO.searchByContent(q, limit)
                : Promise.resolve([]),
            types.includes('users')
                ? UserDAO.search(q, limit)
                : Promise.resolve([]),
        ]);

        return {
            posts: posts.map((p) => toPublicPost(p)),
            comments: comments.map((c) => ({
                id: c.id,
                content: c.content,
                postId: c.postId,
                createdAt: c.createdAt.toISOString(),
                updatedAt: c.updatedAt.toISOString(),
                author: {
                    id: c.author.id,
                    username: c.author.username,
                    name: c.author.name,
                    avatarUrl: c.author.avatarUrl,
                },
            })),
            users: users.map((u) => toPublicDTO(u)),
        };
    }
}
