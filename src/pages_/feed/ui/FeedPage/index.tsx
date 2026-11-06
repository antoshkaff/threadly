import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { PostInfinityList } from '@/widgets/post';

const FeedPage = () => {
  return (
    <section className="pb-3">
      <Tabs defaultValue="for-you">
        <TabsList className="sticky top-[62px] h-fit w-full">
          <TabsTrigger value={'for-you'} className="w-full py-2 font-semibold">
            For You
          </TabsTrigger>
          <TabsTrigger value={'following'} className="w-full py-2 font-semibold">
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value={'for-you'} className="px-5">
          <PostInfinityList />
        </TabsContent>
        <TabsContent value={'following'} className="px-5">
          <PostInfinityList onlyFollowing={true} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default FeedPage;
