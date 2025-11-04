import { AppError } from '@server/modules/error/AppError';

export class PostService {
    static create() {
        throw new AppError('NOT_FOUND', 'Post not found', 404);
    }
}
