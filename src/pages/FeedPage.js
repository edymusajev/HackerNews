import React from 'react';
import { PostsList } from '../features/posts/PostsList';
import { Container } from '../Container';
import { CategoryList } from '../Navbar';

export const FeedPage = () => {
  return (
    <div>
      <div className="bg-white dark:bg-gray-800  border-b pb-2 mb-4 px-4 sm:px-4 md:px-12 lg:px-24 flex items-center justify-between">
        <CategoryList />
      </div>
      <Container>
        <div className="w-2xl max-w-2xl">
          <PostsList />
        </div>
      </Container>
    </div>
  );
};
