import {
  faCircleNotch,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from './';

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  const cardClasses =
    'hover:shadow-xl hover:scale-105 transform transition border-l-4 shadow-lg p-4 bg-white rounded-md';

  return (
    <>
      <h5 className='text-2xl mb-6'>Global Crypto Stats</h5>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {isFetching ? (
          <div className='col-span-4 text-center shadow-lg py-10 bg-white rounded-md'>
            <FontAwesomeIcon className='text-4xl' icon={faCircleNotch} spin />
          </div>
        ) : globalStats ? (
          <>
            <div className={`${cardClasses} border-green-800`}>
              <h6 className='text-md font-semibold'>Total Cryptocurrencies</h6>
              <p>{globalStats.total}</p>
            </div>
            <div className={`${cardClasses} border-yellow-600`}>
              <h6 className='text-md font-semibold'>Total Exchanges</h6>
              <p>{millify(globalStats.totalExchanges)}</p>
            </div>
            <div className={`${cardClasses} border-indigo-600`}>
              <h6 className='text-md font-semibold'>Total Market Cap</h6>
              <p>{millify(globalStats.totalMarketCap)}</p>
            </div>
            <div className={`${cardClasses} border-blue-600`}>
              <h6 className='text-md font-semibold'>Total 24h volume</h6>
              <p>{millify(globalStats.total24hVolume)}</p>
            </div>
            <div className={`${cardClasses} border-pink-600`}>
              <h6 className='text-md font-semibold'>Total Market</h6>
              <p>{millify(globalStats.totalMarkets)}</p>
            </div>
          </>
        ) : (
          <div className='col-span-4 text-center shadow-lg py-10 bg-white rounded-md'>
            <FontAwesomeIcon
              className='text-4xl text-red-600'
              icon={faExclamationTriangle}
            />
          </div>
        )}
      </div>
      <div className='flex mt-8 mb-6 items-center justify-between'>
        <h5 className='text-md font-semibold md:font-normal md:text-2xl'>
          Top 10 Cryptocurrencies in the world
        </h5>
        <Link to='/cryptocurrencies' className='btn secondary filled small'>
          See more
        </Link>
      </div>
      <Cryptocurrencies simplified />
      <div className='flex mt-8 mb-6 items-center justify-between'>
        <h5 className='text-md font-semibold md:font-normal md:text-2xl'>
          Latest News
        </h5>
        <Link to='/news' className='btn secondary filled small'>
          See more
        </Link>
      </div>
      <News simplified />
    </>
  );
};

export default Home;
