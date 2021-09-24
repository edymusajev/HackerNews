import React from 'react';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAppSelector } from '../../app/hooks';
import { selectCommentById } from './comments.slice';
dayjs.extend(relativeTime);

interface Props {
  id: number;
}

export const Comment = ({ id }: Props) => {
  const comment = useAppSelector((state) => selectCommentById(state, id));

  const renderChildren = () => {
    if (comment?.children) {
      return comment.children.map((child: any) => (
        <div className="pl-4 border-l dark:border-gray-600" key={child.id}>
          <Comment id={child.id} />
        </div>
      ));
    }
  };
  if (comment?.text) {
    return (
      <div className="py-4 dark:border-gray-600">
        <p className="">
          <span className="underline">{comment?.author}</span>{' '}
          <span className="dark:text-gray-400 text-gray-700">
            | {dayjs(comment?.created_at).fromNow()}
          </span>
        </p>
        <div className="overflow-hidden">{parse(`${comment?.text}`)}</div>
        <ul className="mb-0">{renderChildren()}</ul>
      </div>
    );
  } else {
    return null;
  }
};
