import React from 'react';

export const Container = ({ children }) => {
  return (
    <div className="px-4 sm:px-4 md:px-12 lg:px-24 flex flex-col justify-center">{children}</div>
  );
};
