import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, selectComments } from './comments.slice';
import { CommentsList } from './CommentsList';

export const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);
  if (!comments) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <p className="mb-4">{comments.length} Comments</p>
        <CommentsList />
      </div>
    );
  }
};
