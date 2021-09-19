import { faReact } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const App = () => {
  return (
    <div className='dark'>
      <div className='h-screen flex items-center justify-center text-center  dark:bg-gray-700 bg-purple-200'>
        <div>
          <p className='dark:text-white text-4xl'>Hello React!</p>
          <FontAwesomeIcon
            className='mt-4 text-4xl text-dark-600 dark:text-blue-400'
            icon={faReact}
            size='lg'
          />
        </div>
      </div>
    </div>
  );
};

export default App;
