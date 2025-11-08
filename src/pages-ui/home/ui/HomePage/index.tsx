import React from 'react';
import { FriendSuggestionsResponsive } from '@/widgets/friend-suggestions';
import { PostInfinityList } from '@/widgets/post';

const HomePage = () => {
    return (
        <section className="grid grid-cols-[1fr_360px] max-xl:grid-cols-[1fr_280px] max-md:grid-cols-1">
            <div className="px-8 py-5">
                <PostInfinityList />
            </div>
            <FriendSuggestionsResponsive />
        </section>
    );
};

export default HomePage;
