import React from 'react';
import { Skeleton } from '@/shared/ui/skeleton';

const PostSkeleton = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <Skeleton className="h-4 w-1/6" />
            </div>
            <Skeleton className="h-[250px] w-full" />
        </div>
    );
};

export default PostSkeleton;
