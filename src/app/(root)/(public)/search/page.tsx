import { SearchPage } from '@/pages_/search';
import { Suspense } from 'react';
import PostSkeleton from '@/entities/post/ui/PostSkeleton';

export default function Page() {
    return (
        <Suspense
            fallback={
                <ul className="flex flex-col gap-3 p-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <li key={i}>
                            <PostSkeleton />
                        </li>
                    ))}
                </ul>
            }
        >
            <SearchPage />
        </Suspense>
    );
}
