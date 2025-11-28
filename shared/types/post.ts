export type PublicPost = {
    id: string;
    content: string;
    images: string[];
    likesCount: number;
    sharesCount: number;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
    author: {
        id: string;
        username: string;
        name: string;
        avatarUrl: string;
    };
    isLiked: boolean;
};
