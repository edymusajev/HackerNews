import React from 'react';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const Comment = ({ comment }) => {
  const renderChildren = () => {
    if (comment.children) {
      return comment.children.map((comment) => <Comment key={comment.id} comment={comment} />);
    }
  };
  return (
    <div className="pb-8 dark:border-gray-600">
      <p className="">
        By <span className="underline">{comment.author}</span> |{' '}
        {dayjs(comment.created_at).fromNow()}
      </p>
      <div className="">{parse(`${comment.text}`)}</div>
      <ul className="mb-0">{renderChildren()}</ul>
    </div>
  );
};
