import React, { Fragment, useState } from 'react';
import { useGetExchangesQuery } from '../services/cryptoApi';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { Loading } from '.';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchanges = data?.data?.exchanges;

  const [selected, setSelected] = useState(null);

  return (
    <>
      <h5 className='text-2xl mb-6'>Exchanges</h5>
      <div className='w-full overflow-auto'>
        {isFetching ? (
          <Loading span={4} />
        ) : exchanges?.length ? (
          <table className='max-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Exchanges
                </th>
                <th
                  scope='col'
                  className='px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  24h Trade Volume
                </th>
                <th
                  scope='col'
                  className='px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Markets
                </th>
                <th
                  scope='col'
                  className='px-4 py-2 md:px-6 md:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Change
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {exchanges?.map((exchange, i) => (
                <Fragment key={exchange.name}>
                  <tr
                    className='cursor-pointer'
                    onClick={() => setSelected(selected !== i ? i : null)}
                  >
                    <td className='px-4 py-2 md:px-6 md:py-3 whitespace-nowrap'>
                      <div className='flex items-center space-x-2'>
                        <p>{exchange.rank}.</p>
                        <img
                          className='w-6 md:w-8'
                          src={exchange.iconUrl}
                          alt='exchange-icon'
                        />
                        <div className='text-sm font-medium text-gray-900'>
                          {exchange.name}
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-2 md:px-6 md:py-3 whitespace-nowrap'>
                      ${millify(exchange.volume)}
                    </td>
                    <td className='px-4 py-2 md:px-6 md:py-3 whitespace-nowrap'>
                      {millify(exchange.numberOfMarkets)}
                    </td>
                    <td className='px-4 py-2 md:px-6 md:py-3 text-right whitespace-nowrap'>
                      {millify(exchange.marketShare)}%
                    </td>
                  </tr>
                  <tr id='show-desc'>
                    <td colSpan='4' className='overflow-hidden'>
                      <div
                        className='transition-all max-h-0 duration-300'
                        style={{
                          maxHeight:
                            selected === i &&
                            document.querySelector(`#container-${i}`)
                              .scrollHeight,
                        }}
                      >
                        <div
                          className='p-4 mb-6 prose max-w-max prose-sm'
                          id={`container-${i}`}
                        >
                          {HTMLReactParser(exchange.description || '')}
                        </div>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='col-span-4 text-center shadow-lg py-10 bg-white rounded-md'>
            <FontAwesomeIcon
              className='text-4xl text-red-600 mb-4'
              icon={faExclamationTriangle}
            />
            <h4 className='text-md font-semibold'>No News Found</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Exchanges;
