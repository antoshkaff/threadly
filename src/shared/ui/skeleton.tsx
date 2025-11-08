import { cn } from '@/shared/lib/index';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="skeleton"
            className={cn(
                'bg-skeleton animate-pulse rounded-md transition-colors duration-200',
                className,
            )}
            {...props}
        />
    );
}

export { Skeleton };
