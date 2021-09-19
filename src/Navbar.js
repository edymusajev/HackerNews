import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { postsCleared } from './features/posts/posts.slice';
import logo from './logo.png';

export const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const handleLink = () => {
    console.log(location);
    if (location.pathname !== '/') {
      dispatch(postsCleared());
    }
    history.push('/');
  };
  return (
    <div className="border-b h-12 mb-4 px-4 sm:px-4 md:px-12 lg:px-24 flex items-center">
      {/* <img src={logo} /> */}
      <div onClick={handleLink} className="text-xl font-bold cursor-pointer">
        HackerNews
      </div>
    </div>
  );
};
