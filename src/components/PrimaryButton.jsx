import React from 'react';

const PrimaryButton = ({ children, ...rest }) => {
  return (
    <button
      className='w-10 h-10 focus:ring-primary-light focus:ring-opacity-70 focus:ring-2 focus:outline-none rounded-full transition hover:bg-primary-light hover:bg-opacity-10'
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
