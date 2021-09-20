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
    <div className="pb-8">
      <p className="">
        By <span className="underline">{comment.author}</span> |{' '}
        {dayjs(comment.created_at).fromNow()}
      </p>
      <div>{parse(`${comment.text}`)}</div>
      <ul className="mb-0">{renderChildren()}</ul>
    </div>
  );
};
