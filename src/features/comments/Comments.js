import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../Container';
import { fetchComments, selectComments, selectStatus } from './comments.slice';
import { CommentsList } from './CommentsList';

export const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);
  return (
    <div className="">
      <p className="mb-4">{comments ? comments.length : null} Comments</p>
      {status === 'fulfilled' ? <CommentsList /> : <div>Loading</div>}
    </div>
  );
};
