import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Loading = ({ span }) => {
  return (
    <div
      className={`col-span-${span} text-center shadow-lg py-10 bg-white rounded-md`}
    >
      <FontAwesomeIcon className='text-4xl' icon={faCircleNotch} spin />
    </div>
  );
};

export default Loading;
