import {
  faChartLine,
  faExchangeAlt,
  faHome,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import icon from '../images/cryptocurrency.png';

const Drawer = ({ isOpen, onClose }) => {
  const links = [
    { url: '/', title: 'Home', icon: faHome },
    { url: '/cryptocurrencies', title: 'Cryptocurrencies', icon: faChartLine },
    { url: '/exchanges', title: 'Exchanges', icon: faExchangeAlt },
    { url: '/news', title: 'News', icon: faNewspaper },
  ];

  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : ' -translate-x-full'
      } sidebar z-50 w-64 lg:shadow transform xl:translate-x-0 transition-transform duration-150 ease-out bg-primary-light text-white`}
    >
      <Link
        onClick={() => onClose()}
        to='/'
        className='focus:bg-gray-300 focus:outline-none focus:bg-opacity-25 flex p-4 border-b justify-center items-center space-x-2'
      >
        <img className='w-10' src={icon} alt='CryptoVerse' />
        <h2 className='font-semibold text-xl'>CryptoVerse</h2>
      </Link>
      <div>
        <ul className='mt-2 p-2'>
          {links.map(link => (
            <li
              onClick={() => onClose()}
              key={link.url}
              className='relative group w-full hover:bg-gray-300 hover:bg-opacity-25 rounded my-1 transition'
            >
              <NavLink
                exact
                activeClassName='bg-secondary-500 focus:bg-secondary-500 hover:bg-secondary-600'
                to={link.url}
                className='transition w-full inline-block px-4 py-3 rounded focus:bg-gray-300 focus:outline-none focus:bg-opacity-25'
              >
                <FontAwesomeIcon className='mr-3' icon={link.icon} />
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Drawer;
