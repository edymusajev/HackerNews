import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { PostExcerpt } from './PostExcerpt';
import {
  fetchIds,
  fetchMorePosts,
  fetchPosts,
  postsCleared,
  selectIds,
  selectPosts,
  selectStartIndex,
  selectType,
  setNextPage,
} from './posts.slice';

export const Loading = () => {
  return <div className="h-12 flex items-center justify-center">Loading...</div>;
};

export const PostsList = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectIds);
  const posts = useSelector(selectPosts);
  const startIndex = useSelector(selectStartIndex);
  const type = useSelector(selectType);

  //   initial load
  useEffect(() => {
    dispatch(fetchIds(type));
  }, [dispatch, type]);

  // after receiving the id array fetch posts
  useEffect(() => {
    if (ids) {
      dispatch(fetchPosts());
    }
  }, [ids, dispatch]);

  // fetch more posts
  useEffect(() => {
    if (startIndex > 0) {
      dispatch(fetchMorePosts());
    }
  }, [startIndex, dispatch]);

  const loadMorePosts = () => {
    dispatch(setNextPage());
  };

  const hasMorePages = () => {
    return startIndex < ids.length ? true : false;
  };

  const renderedPosts = posts
    ? posts.map((post) => (
        <React.Fragment key={nanoid()}>
          <PostExcerpt post={post} />
        </React.Fragment>
      ))
    : 'gg';

  return (
    <div>
      {posts && (
        <ul>
          <InfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMorePages}
            loader={<Loading />}
          >
            {renderedPosts}
          </InfiniteScroll>{' '}
        </ul>
      )}
    </div>
  );
};
