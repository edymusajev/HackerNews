import React from 'react';
import { useSelector } from 'react-redux';
import { Comment } from './Comment';
import { selectComments } from './comments.slice';

export const CommentsList = () => {
  const comments = useSelector(selectComments);
  const renderComments = () => {
    return comments.map((comment) =>
      comment.text !== null ? (
        <React.Fragment key={comment.id}>
          <Comment comment={comment} />
        </React.Fragment>
      ) : null
    );
  };
  return <ul className="">{renderComments()}</ul>;
};
