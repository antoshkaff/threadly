import React from 'react';
import { PostInfinityList } from '@/widgets/post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

const FeedPage = () => {
    return (
        <section className="pb-3">
            <Tabs defaultValue="for-you">
                <TabsList className="h-fit w-full sticky top-[62px]">
                    <TabsTrigger
                        value={'for-you'}
                        className="py-2 w-full font-semibold"
                    >
                        For You
                    </TabsTrigger>
                    <TabsTrigger
                        value={'following'}
                        className="py-2 w-full font-semibold"
                    >
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
