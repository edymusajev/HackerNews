import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { postsCleared, selectType, typeChanged } from './features/posts/posts.slice';
import { FaHackerNewsSquare } from 'react-icons/fa';
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineFire,
  AiFillFire,
  AiOutlineCrown,
  AiFillCrown,
  AiOutlineThunderbolt,
  AiFillThunderbolt,
  AiFillCompass,
  AiOutlineCompass,
} from 'react-icons/ai';
import { RiQuestionAnswerLine, RiQuestionAnswerFill } from 'react-icons/ri';

export const Category = ({ text, type, selectedIcon, unselectedIcon }) => {
  const dispatch = useDispatch();
  const selectedType = useSelector(selectType);
  const handleClick = () => {
    console.log('help');
    if (type !== selectedType) {
      dispatch(typeChanged(type));
    }
  };
  return (
    <div
      className={`ml-4 cursor-pointer ${selectedType === type ? '' : 'text-gray-300'}`}
      onClick={() => handleClick()}
    >
      <div className="inline-flex items-center">
        {selectedType === type ? selectedIcon : unselectedIcon}
        <span className="ml-1">{text}</span>{' '}
      </div>
    </div>
  );
};

export const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const type = useSelector(selectType);

  const handleLink = () => {
    if (location.pathname !== '/') {
      dispatch(postsCleared());
    }
    dispatch(typeChanged('topstories'));
    history.push('/');
  };
  const handlePostsLink = (type) => {
    dispatch(typeChanged(type));
    if (location.pathname !== '/') {
      dispatch(postsCleared());
    }
    history.push('/');
  };
  return (
    <div className="border-b h-12 mb-4 px-4 sm:px-4 md:px-12 lg:px-24 flex items-center justify-between">
      <div onClick={handleLink} className="text-xl font-bold cursor-pointer flex items-center">
        <FaHackerNewsSquare size="2rem" />
        <span className="ml-2 hidden sm:inline">HackerNews</span>
      </div>
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
    </div>
  );
};
