import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '.';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const limit = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(limit);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = data?.data?.coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setCryptos(filteredData);
  }, [data, searchTerm]);

  return (
    <>
      {!simplified && (
        <div className='flex-col sm:flex-row mb-6 flex items-center justify-between'>
          <h5 className='text-2xl w-full mb-4 sm:mb-0'>Cryptocurrencies</h5>
          <input
            className='w-full px-3 py-2 rounded border-2 focus:outline-none focus:ring-2 focus:ring-secondary-400'
            type='search'
            placeholder='Search Cryptos'
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {isFetching ? (
          <Loading span={4} />
        ) : cryptos?.length ? (
          cryptos.map(currency => (
            <Link
              key={currency.id}
              to={`/crypto/${currency.id}`}
              className='hover:shadow-xl focus:shadow-xl transition shadow-lg bg-white rounded-md focus:bg-gray-200 focus:outline-none'
            >
              <div className='border-b py-2 px-4 flex items-center justify-between'>
                <h6 className='text-lg font-semibold'>
                  {currency.rank}. {currency.name}
                </h6>
                <img
                  className='w-8'
                  src={currency.iconUrl}
                  alt={currency.name}
                />
              </div>
              <div className='p-4'>
                <p className='my-2'> Price: {millify(currency.price)}</p>
                <p className='my-2'>
                  {' '}
                  Market Cap: {millify(currency.marketCap)}
                </p>
                <p className='my-2'>
                  {' '}
                  Daily Change: {millify(currency.change)}%
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className='col-span-4 text-center shadow-lg py-10 bg-white rounded-md'>
            <FontAwesomeIcon
              className='text-4xl text-red-600 mb-4'
              icon={faExclamationTriangle}
            />
            <h4 className='text-md font-semibold'>
              No Cryptocurrency Found {searchTerm && `for "${searchTerm}"`}
            </h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Cryptocurrencies;
