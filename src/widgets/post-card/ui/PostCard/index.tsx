import React from 'react';
import { UserAvatar } from '@/entities/user';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { SendHorizonal } from 'lucide-react';
import { PostActions } from '@/features/post-actions';

const PostCard = () => {
    return (
        <article className="border border-[--border] rounded-3xl bg-[var(--background-second)] transition-colors duration-200">
            <header className="flex gap-3 items-center p-5 border-b border-b-[--border] transition-colors duration-200">
                <UserAvatar />
                <h3 className="font-semibold">X_AE_A-13</h3>
                <span className="text-sm text-zinc-400">3 min ago</span>
            </header>
            <div className="flex flex-col gap-3 px-5 py-4 border-b border-b-[--border] transition-colors duration-200">
                <p>
                    Habitant morbi tristique senectus et netus et. Suspendisse
                    sed nisi lacus sed viverra. Dolor morbi non arcu risus quis
                    varius. #amazing #great #lifetime #uiux #machinelearning
                </p>

                <PostActions likes={12} comments={11} share={54} />
            </div>
            <footer className="flex justify-between p-5 items-center gap-8">
                <div className="flex gap-2 w-full">
                    <UserAvatar />
                    <Input
                        placeholder="Write your comment..."
                        className="h-auto self-stretch"
                    />
                </div>
                <div className="flex gap-2 max-md:hidden">
                    <Button
                        variant={'outline'}
                        size={'icon-lg'}
                        className="rounded-full border-primary bg-transparent hover:border-input"
                    >
                        <SendHorizonal className="size-5 text-primary" />
                    </Button>
                </div>
            </footer>
        </article>
    );
};

export default PostCard;
