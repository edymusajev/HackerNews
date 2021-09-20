import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../Container';
import { fetchComments, selectComments } from './comments.slice';
import { CommentsList } from './CommentsList';

export const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);
  return (
    <div className="">
      <p className="mb-4">{comments ? comments.length : null} Comments</p>
      {comments ? <CommentsList /> : <div>Loading</div>}
    </div>
  );
};
