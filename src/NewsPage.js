import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchIds,
  fetchMoreStories,
  fetchStories,
  selectIds,
  selectStartIndex,
  selectStories,
  selectType,
  setNextPage,
  typeChanged,
} from './features/news/news.slice';
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineFire,
  AiFillFire,
  AiOutlineCrown,
  AiFillCrown,
  AiOutlineThunderbolt,
  AiFillThunderbolt,
} from 'react-icons/ai';

const ItemExcerpt = ({ item }) => {
  dayjs.extend(relativeTime);
  const url = item.url ? new URL(item.url) : null;
  const id = item.id;
  return (
    <li className="mb-4 pb-4 border-b dark:border-gray-600">
      <small className="text-gray-700 dark:text-gray-400">
        {dayjs.unix(item.time).fromNow()} by <span className="underline">{item.by}</span>
      </small>
      <div className="">
        <a className="text-lg hover:underline" href={item.url}>
          {item.title}
        </a>{' '}
        {item.url && (
          <small className="text-blue-900 dark:text-blue-400 hover:underline">
            <a href={url.origin} target="_blank" rel="noreferrer">
              ({url.hostname})
            </a>
          </small>
        )}
      </div>
      <div className="flex mt-2">
        <div>
          <div className="flex items-center mr-4">
            <AiOutlineHeart size="1.25rem" /> <span className="ml-1">{item.score}</span>
          </div>
        </div>
        <Link to={`/item/${id}`} className="hover:underline cursor-pointer pb-0">
          <div className="flex items-center">
            <AiOutlineMessage size="1.25rem" />{' '}
            <span className="ml-1">{item.descendants ? item.descendants : '0'}</span>
          </div>
        </Link>
      </div>
    </li>
  );
};

export const NewsPage = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectIds);
  const items = useSelector(selectStories);
  const startIndex = useSelector(selectStartIndex);
  const type = useSelector(selectType);

  useEffect(() => {
    dispatch(fetchIds(type));
  }, [dispatch, type]);

  // after receiving the id array fetch stories
  useEffect(() => {
    if (ids) {
      dispatch(fetchStories());
    }
  }, [ids, dispatch]);

  // fetch more stories
  useEffect(() => {
    if (startIndex > 0) {
      dispatch(fetchMoreStories());
    }
  }, [startIndex, dispatch]);

  const hasMorePages = () => {
    return startIndex < ids.length ? true : false;
  };
  const getMoreStories = () => {
    dispatch(setNextPage());
  };
  const renderedStories = items.map((item) => (
    <React.Fragment key={nanoid()}>
      <ItemExcerpt item={item} />
    </React.Fragment>
  ));

  if (items) {
    return (
      <div className="px-4 sm:px-4 md:px-12 lg:px-24 ">
        <div className="mb-4 cursor-pointer flex justify-evenly">
          <span
            className={type === 'topstories' ? 'font-bold' : ''}
            onClick={() => dispatch(typeChanged('topstories'))}
          >
            <div className="inline-flex items-center">
              {type === 'topstories' ? (
                <AiFillFire size="1.25rem" />
              ) : (
                <AiOutlineFire size="1.25rem" />
              )}
              <span className="ml-1">Trending</span>{' '}
            </div>
          </span>{' '}
          |{' '}
          <span
            className={type === 'beststories' ? 'font-bold' : ''}
            onClick={() => dispatch(typeChanged('beststories'))}
          >
            <div className="inline-flex items-center">
              {type === 'beststories' ? (
                <AiFillCrown size="1.25rem" />
              ) : (
                <AiOutlineCrown size="1.25rem" />
              )}
              <span className="ml-1">Best</span>{' '}
            </div>
          </span>{' '}
          |{' '}
          <span
            className={type === 'newstories' ? 'font-bold' : ''}
            onClick={() => dispatch(typeChanged('newstories'))}
          >
            <div className="inline-flex items-center">
              {type === 'newstories' ? (
                <AiFillThunderbolt size="1.25rem" />
              ) : (
                <AiOutlineThunderbolt size="1.25rem" />
              )}
              <span className="ml-1">New</span>{' '}
            </div>
          </span>{' '}
        </div>

        <ul>
          <InfiniteScroll dataLength={items.length} next={getMoreStories} hasMore={hasMorePages}>
            {renderedStories}
          </InfiniteScroll>{' '}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="px-4 sm:px-4 md:px-12 lg:px-24 max-w-screen-lg flex justify-center items-center">
        loading
      </div>
    );
  }
};
