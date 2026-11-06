'use client';

import { Send } from 'lucide-react';
import React from 'react';

import { useCurrentUser } from '@/entities/user/api/hooks';
import AddPostForm, { FORM_ID } from '@/features/post/add-post/ui/AddPostForm';
import { useProfile } from '@/pages_/profile/api/hooks';
import { Button } from '@/shared/ui/button';
import { PostInfinityList } from '@/widgets/post';
import { UserCard } from '@/widgets/user';

type Props = {
  username: string;
};
const ProfilePage = ({ username }: Props) => {
  const { data } = useProfile(username);
  const user = useCurrentUser();
  if (!data) return;

  return (
    <section className="flex min-h-[calc(100vh-62px)] flex-col">
      <div className="flex flex-1 flex-col gap-4 p-4">
        {user?.id === data.id && (
          <div className="flex flex-col rounded-3xl border border-[--border] bg-[var(--background-second)] p-6">
            <AddPostForm />
            <Button
              type="submit"
              size={'lg'}
              form={FORM_ID}
              className="ml-auto w-1/3 text-[16px] font-semibold"
            >
              Post
              <Send className="size-5" />
            </Button>
          </div>
        )}

        <PostInfinityList username={username} />
      </div>
      <UserCard profile={data} user={user} className="sticky bottom-0" />
    </section>
  );
};

export default ProfilePage;
