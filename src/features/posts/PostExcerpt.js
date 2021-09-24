import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { postsCleared } from './posts.slice';

export const PostExcerpt = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLink = () => {
    dispatch(postsCleared());
    history.push(`/posts/${id}`);
  };
  dayjs.extend(relativeTime);
  const url = post.url ? new URL(post.url) : null;
  const id = post.id;
  return (
    <li className="mb-4 pb-4 border-b dark:border-gray-600">
      <small className="text-gray-700 dark:text-gray-400">
        {dayjs.unix(post.time).fromNow()} by <span className="underline">{post.by}</span>
      </small>
      <div className="">
        <Link className="text-lg hover:underline" to={`posts/${post.id}`}>
          {post.title}
        </Link>{' '}
        {/* <img src={DOMParser(post.url) } /> */}
        {post.url && (
          <small className="text-blue-900 dark:text-blue-400 hover:underline">
            <a href={post.url} target="_blank" rel="noreferrer" className="flex items-center">
              <span className="mr-1">({url.hostname})</span> <FiExternalLink />
            </a>
          </small>
        )}
      </div>
      <div className="flex mt-2">
        <div>
          <div className="flex items-center mr-4">
            <AiOutlineHeart size="1.25rem" /> <span className="ml-1">{post.score}</span>
          </div>
        </div>
        <div onClick={() => handleLink(post.id)} className="hover:underline cursor-pointer pb-0">
          <div className="flex items-center">
            <AiOutlineMessage size="1.25rem" />{' '}
            <span className="ml-1">{post.descendants ? post.descendants : '0'}</span>
          </div>
        </div>
      </div>
    </li>
  );
};
