import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { PostExcerpt } from './PostExcerpt';
import {
  fetchIds,
  fetchMorePosts,
  fetchPosts,
  selectIds,
  selectPosts,
  selectPostsStatus,
  selectStartIndex,
  selectType,
  setNextPage,
} from './posts.slice';

export const Loader = () => {
  return <div className="h-12 flex items-center justify-center">Loading...</div>;
};

const PostsList = () => {
  const dispatch = useDispatch();
  const postsStatus = useSelector(selectPostsStatus);
  const ids = useSelector(selectIds);
  const posts = useSelector(selectPosts);
  const startIndex = useSelector(selectStartIndex);
  const type = useSelector(selectType);

  //   initial load
  useEffect(() => {
    dispatch(fetchIds(type));
    dispatch(fetchPosts(type));
  }, [type, dispatch]);

  const loadMorePosts = () => {
    dispatch(setNextPage());
    dispatch(fetchMorePosts());
  };

  const hasMorePages = () => {
    return startIndex < ids.length ? true : false;
  };

  const renderFeed = () => {
    if (postsStatus === 'fulfilled' && posts) {
      const renderedPosts = posts.map((post) => (
        <React.Fragment key={nanoid()}>
          <PostExcerpt post={post} />
        </React.Fragment>
      ));
      return (
        <ul>
          <InfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMorePages}
            loader={<Loader />}
          >
            {renderedPosts}
          </InfiniteScroll>
        </ul>
      );
    } else {
      return <div className="flex justify-center h-screen pt-8">Loading...</div>;
    }
  };

  return <>{renderFeed()}</>;
};

export default PostsList;
