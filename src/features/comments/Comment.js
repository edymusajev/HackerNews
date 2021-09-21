import React from 'react';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const Comment = ({ comment }) => {
  const renderChildren = () => {
    if (comment.children) {
      return comment.children.map((comment) => (
        <div className="pl-4 border-l dark:border-gray-600" key={comment.id}>
          <Comment comment={comment} />
        </div>
      ));
    }
  };
  return (
    <div className="py-4 dark:border-gray-600">
      <p className="">
        <span className="underline">{comment.author}</span>{' '}
        <span className="dark:text-gray-400 text-gray-700">
          | {dayjs(comment.created_at).fromNow()}
        </span>
      </p>
      <div className="overflow-hidden">{parse(`${comment.text}`)}</div>
      <ul className="mb-0">{renderChildren()}</ul>
    </div>
  );
};
