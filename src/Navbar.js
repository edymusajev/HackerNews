import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

export const Navbar = () => {
  return (
    <div className="border-b h-12 mb-4 px-4 sm:px-4 md:px-12 lg:px-24 flex items-center">
      {/* <img src={logo} /> */}
      <Link to={'/'} className="text-xl font-bold">
        HackerNews
      </Link>
    </div>
  );
};
