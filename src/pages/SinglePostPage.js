import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Container } from '../Container';
import { Comments } from '../features/comments/Comments';
import { fetchSinglePost, selectSinglePost } from '../features/posts/posts.slice';

export const SinglePostPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(selectSinglePost);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [id, dispatch]);
  if (!post) {
    return <div>loading</div>;
  } else {
    console.log(post);
    const { host } = new URL(post.url);
    return (
      <Container>
        <div className="mb-8 max-w-full">
          <a className="text-lg" href={post.url} target="_blank" rel="noreferrer">
            {post.title}
          </a>{' '}
          <small className="text-blue-900 dark:text-blue-400 hover:underline">
            <a href={post.url} target="_blank" rel="noreferrer">
              ({host})
            </a>
          </small>
        </div>
        <Comments postId={id} />
      </Container>
    );
  }
};
