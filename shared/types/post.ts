export type PublicPost = {
    id: string;
    authorId: string;
    content: string;
    images: string[];
    likesCount: number;
    sharesCount: number;
    commentsCount: number;
    createdAt: string;
    updatedAt: string;
    liked?: boolean;
};
