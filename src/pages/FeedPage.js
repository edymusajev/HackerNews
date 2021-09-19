import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { selectType, typeChanged } from '../features/posts/posts.slice';
import { PostsList } from '../features/posts/PostsList';

const FeedTypeBtn = ({ text, type, selectedIcon, unselectedIcon }) => {
  const dispatch = useDispatch();
  const selectedType = useSelector(selectType);
  const onTypeChange = () => {
    if (type !== selectedType) {
      dispatch(typeChanged(type));
    }
  };
  return (
    <div
      className={`cursor-pointer ${selectedType === type ? 'font-bold' : ''}`}
      onClick={onTypeChange}
    >
      <div className="inline-flex items-center">
        {selectedType === type ? selectedIcon : unselectedIcon}
        <span className="ml-1">{text}</span>{' '}
      </div>
    </div>
  );
};

export const FeedPage = () => {
  return (
    <div className="px-4 sm:px-4 md:px-12 lg:px-24 ">
      <div className="flex items-center justify-evenly">
        <FeedTypeBtn
          text="Trending"
          type="topstories"
          selectedIcon={<AiFillFire size="1.25rem" />}
          unselectedIcon={<AiOutlineFire size="1.25rem" />}
        />
        <FeedTypeBtn
          text="Best"
          type="beststories"
          selectedIcon={<AiFillCrown size="1.25rem" />}
          unselectedIcon={<AiOutlineCrown size="1.25rem" />}
        />
        <FeedTypeBtn
          text="New"
          type="newstories"
          selectedIcon={<AiFillThunderbolt size="1.25rem" />}
          unselectedIcon={<AiOutlineThunderbolt size="1.25rem" />}
        />
      </div>
      <PostsList />
    </div>
  );
};
