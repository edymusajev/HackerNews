import React from 'react';
import { useSelector } from 'react-redux';
import { Comment } from './Comment';
import { selectComments } from './comments.slice';

export const CommentsList = () => {
  const comments = useSelector(selectComments);
  const renderComments = () => {
    return comments.map((comment) => (
      <React.Fragment key={comment.id}>
        <Comment comment={comment} />
      </React.Fragment>
    ));
  };
  if (!comments) {
    return <ul>Loading...</ul>;
  } else {
    return <ul className="">{renderComments()}</ul>;
  }
};
