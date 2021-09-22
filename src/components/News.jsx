import {
  faDotCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useState } from 'react';
import { Loading, SelectNews } from '.';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const News = ({ simplified }) => {
  const [selected, setSelected] = useState({ name: 'Cryptocurrencies' });
  const { data: coinData } = useGetCryptosQuery(100);
  const coins = coinData?.data?.coins;

  const limit = simplified ? 6 : 12;
  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory: selected.name,
    limit,
  });
  const cryptoNews = data?.value;

  const demoImageUrl =
    'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

  return (
    <>
      {!simplified && (
        <div className='flex-col sm:flex-row mb-6 flex items-center justify-between'>
          <h5 className='text-2xl w-full mb-4 sm:mb-0'>
            Latest {selected.name} News
          </h5>
          {coins && (
            <SelectNews
              selected={selected}
              setSelected={setSelected}
              coins={coins}
            />
          )}
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6'>
        {isFetching ? (
          <Loading span={4} />
        ) : cryptoNews.length ? (
          cryptoNews.map((news, i) => (
            <a
              key={i}
              href={news.url}
              target='_blank'
              rel='noreferrer'
              className='hover:shadow-xl focus:shadow-xl transition shadow-lg bg-white rounded-md focus:bg-gray-200 focus:outline-none p-4 sm:flex space-y-4 sm:space-y-0 sm:space-x-4'
            >
              <img
                src={news.image?.thumbnail?.contentUrl || demoImageUrl}
                alt='news'
                className='flex-none w-18 h-18 rounded-lg object-cover bg-gray-100'
                width='138'
                height='138'
              />
              <div className='min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20'>
                <h2 className='text-sm font-semibold text-black mb-0.5'>
                  {news.name}
                </h2>
                <p className='text-sm'>
                  {news.description.length > 0
                    ? `${news.description.substring(0, 80)}...`
                    : news.description}
                </p>
                <div className='flex items-center flex-wrap text-sm font-medium whitespace-pre mt-1'>
                  <img
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImageUrl
                    }
                    alt='news provider'
                    className='w-6 rounded'
                  />
                  <p className='ml-1 mr-2'>{news.provider[0]?.name}</p>
                  <FontAwesomeIcon
                    className='text-xs text-gray-700 mr-2'
                    icon={faDotCircle}
                  />
                  <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
                </div>
              </div>
            </a>
          ))
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

export default News;
