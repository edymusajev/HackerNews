import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { postsCleared, resetIndex, selectType, typeChanged } from './features/posts/posts.slice';
import { FaHackerNewsSquare } from 'react-icons/fa';
import {
  AiOutlineFire,
  AiFillFire,
  AiOutlineCrown,
  AiFillCrown,
  AiOutlineThunderbolt,
  AiFillThunderbolt,
  AiFillCompass,
  AiOutlineCompass,
} from 'react-icons/ai';

import { RiMoonClearLine, RiMoonClearFill } from 'react-icons/ri';
import { RiQuestionAnswerLine, RiQuestionAnswerFill } from 'react-icons/ri';

export const Category = ({ text, type, selectedIcon, unselectedIcon }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedType = useSelector(selectType);
  const handleClick = () => {
    if (type !== selectedType) {
      if (location.pathname !== '/') {
        dispatch(postsCleared());
        dispatch(resetIndex());
        history.push('/');
      }
      dispatch(typeChanged(type));
    }
  };
  return (
    <div
      className={`mr-4 cursor-pointer ${
        selectedType === type ? '' : 'text-gray-500 dark:text-gray-300'
      }`}
      onClick={() => handleClick()}
    >
      <div className="inline-flex items-center">
        <span style={selectedType === type ? { color: '#fa6630' } : null}>
          {selectedType === type ? selectedIcon : unselectedIcon}
        </span>
        <span className="ml-1">{text}</span>{' '}
      </div>
    </div>
  );
};
export const CategoryList = () => {
  return (
    <div className="flex items-center cursor-pointer overflow-y-scroll">
      <Category
        text="Trending"
        type="topstories"
        selectedIcon={<AiFillFire size="1.25rem" />}
        unselectedIcon={<AiOutlineFire size="1.25rem" />}
      />
      <Category
        text="Best"
        type="beststories"
        selectedIcon={<AiFillCrown size="1.25rem" />}
        unselectedIcon={<AiOutlineCrown size="1.25rem" />}
      />
      <Category
        text="New"
        type="newstories"
        selectedIcon={<AiFillThunderbolt size="1.25rem" />}
        unselectedIcon={<AiOutlineThunderbolt size="1.25rem" />}
      />
      <Category
        text="Job"
        type="jobstories"
        selectedIcon={<AiFillCompass size="1.25rem" />}
        unselectedIcon={<AiOutlineCompass size="1.25rem" />}
      />
      <Category
        text="Ask"
        type="askstories"
        selectedIcon={<RiQuestionAnswerFill size="1.25rem" />}
        unselectedIcon={<RiQuestionAnswerLine size="1.25rem" />}
      />
    </div>
  );
};

export const Navbar = () => {
  const [darkModeEnabled, setDarkmodeEnabled] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleLink = () => {
    if (location.pathname !== '/') {
      dispatch(postsCleared());
    }
    dispatch(typeChanged('topstories'));
    history.push('/');
  };
  const toggleDarkmode = () => {
    setDarkmodeEnabled(!darkModeEnabled);
    const html = document.querySelector('html');
    html.querySelector('.dark')
      ? document.body.classList.remove('dark')
      : document.body.classList.add('dark');
  };
  return (
    <div className="border-b h-12 mb-4 px-4 sm:px-4 md:px-12 lg:px-24 flex items-center justify-between">
      <div className=" flex items-center justify-between w-full">
        <div onClick={handleLink} className="flex items-center cursor-pointer">
          <FaHackerNewsSquare size="2rem" color="#fa6730" />
          <span className="ml-2 hidden sm:inline text-xl font-bold cursor-pointer">HackerNews</span>
        </div>

        <p className="cursor-pointer " onClick={toggleDarkmode}>
          {darkModeEnabled ? (
            <RiMoonClearFill size="1.5rem" color="#fa6630" />
          ) : (
            <RiMoonClearLine size="1.5rem" />
          )}
        </p>
      </div>
    </div>
  );
};
