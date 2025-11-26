import { PostSkeleton } from '@/entities/post';
import { CommentSkeleton } from '@/entities/comment';

export default function loading() {
    return (
        <div className="flex flex-col gap-3 p-3">
            <PostSkeleton />
            <ul className="flex flex-col gap-3 p-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>
                        <CommentSkeleton />
                    </li>
                ))}
            </ul>
        </div>
    );
}
