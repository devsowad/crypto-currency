import React from 'react';

const Backdrop = ({ isOpen, onClose }) => {
  return (
    <div
      className={`${
        !isOpen && 'hidden'
      } fixed transition ease-in duration-150 inset-0 bg-gray-600 bg-opacity-90`}
      onClick={() => onClose()}
    ></div>
  );
};

export default Backdrop;
