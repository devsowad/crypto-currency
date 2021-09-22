import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

const Appbar = ({ onClose }) => {
  return (
    <header className='header bg-white shadow py-1 px-1 xl:hidden'>
      <div className='header-content flex items-center flex-row'>
        <button
          className='xl:hidden mr-4 primary icon'
          tabIndex='1'
          onClick={() => onClose()}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button className='primary icon'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </header>
  );
};

export default Appbar;
