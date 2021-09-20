import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButton } from './';

const Appbar = ({ onClose }) => {
  return (
    <header className='header bg-white shadow py-4 px-4'>
      <div className='header-content flex items-center flex-row'>
        <PrimaryButton
          className='lg:hidden mr-4'
          tabIndex='1'
          onClick={() => onClose()}
        >
          <FontAwesomeIcon icon={faBars} />
        </PrimaryButton>
        <PrimaryButton>
          <FontAwesomeIcon icon={faSearch} />
        </PrimaryButton>
      </div>
    </header>
  );
};

export default Appbar;
