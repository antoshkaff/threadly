export type PublicComment = {
    id: string;
    postId: string;
    content: string;
    createdAt: string;
    author: {
        id: string;
        username: string;
        name: string;
        avatarUrl: string;
    };
};
