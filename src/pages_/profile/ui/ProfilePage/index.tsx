'use client';

import React from 'react';
import { useProfile } from '@/pages_/profile/api/hooks';

import { PostInfinityList } from '@/widgets/post';
import { useUser } from '@/entities/user/model/store';
import AddPostForm, { FORM_ID } from '@/features/post/add-post/ui/AddPostForm';
import { Button } from '@/shared/ui/button';
import { Send } from 'lucide-react';
import { UserCard } from '@/widgets/user';

type Props = {
    username: string;
};
const ProfilePage = ({ username }: Props) => {
    const { data } = useProfile(username);
    const user = useUser((s) => s.user);
    if (!data) return;

    return (
        <section>
            <UserCard profile={data} user={user} className="sticky top-0" />
            <div className="p-4 flex flex-col gap-4">
                {user?.id === data.id && (
                    <div className="flex flex-col border border-[--border] rounded-3xl bg-[var(--background-second)] p-6">
                        <AddPostForm />
                        <Button
                            type="submit"
                            size={'lg'}
                            form={FORM_ID}
                            className="text-[16px] font-semibold ml-auto w-1/3"
                        >
                            Post
                            <Send className="size-5" />
                        </Button>
                    </div>
                )}

                <PostInfinityList username={username} />
            </div>
        </section>
    );
};

export default ProfilePage;
