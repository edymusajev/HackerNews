import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Comment } from './Comment';
import { selectComments } from './comments.slice';

export const CommentsList = () => {
  const comments = useAppSelector(selectComments);

  const renderComments = () => {
    if (comments) {
      return comments.map((comment) => <Comment key={comment.id} id={comment.id} />);
    }
  };
  return <ul>{renderComments()}</ul>;
};
