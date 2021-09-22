import React, { useState } from 'react';
import { useParams } from 'react-router';
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faChartLine,
  faCheck,
  faDollarSign,
  faExclamation,
  faExclamationTriangle,
  faFileInvoiceDollar,
  faHandHoldingUsd,
  faHashtag,
  faTimes,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import millify from 'millify';
import { LineChart, Loading } from '.';
import HTMLReactParser from 'html-react-parser';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;

  const { data: coinHistory, isFetching: isFetchingChartData } =
    useGetCryptoHistoryQuery({ coinId, timePeriod });

  const periods = ['24h', '7d', '30d', '1y', '5y'];

  const stats = !cryptoDetails
    ? []
    : [
        {
          title: 'Price to USD',
          value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
          icon: faDollarSign,
        },
        { title: 'Rank', value: cryptoDetails.rank, icon: faHashtag },
        {
          title: '24h Volume',
          value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
          icon: faBold,
        },
        {
          title: 'Market Cap',
          value: `$ ${
            cryptoDetails.marketCap && millify(cryptoDetails.marketCap)
          }`,
          icon: faHandHoldingUsd,
        },
        {
          title: 'All-time-high(daily avg.)',
          value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
          icon: faTrophy,
        },
      ];

  const genericStats = !cryptoDetails
    ? []
    : [
        {
          title: 'Number Of Markets',
          value: cryptoDetails.numberOfMarkets,
          icon: faChartLine,
        },
        {
          title: 'Number Of Exchanges',
          value: cryptoDetails.numberOfExchanges,
          icon: faFileInvoiceDollar,
        },
        {
          title: 'Aprroved Supply',
          value: cryptoDetails.approvedSupply ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faTimes} />
          ),
          icon: faExclamation,
        },
        {
          title: 'Total Supply',
          value: `$ ${millify(cryptoDetails.totalSupply)}`,
          icon: faExclamation,
        },
        {
          title: 'Circulating Supply',
          value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
          icon: faExclamation,
        },
      ];

  return (
    <>
      {isFetching ? (
        <Loading span={4} />
      ) : cryptoDetails ? (
        <div>
          <div className='mb-6'>
            <h5 className='text-2xl'>
              {cryptoDetails.name} ({data?.data?.coin.slug})
            </h5>
            <p className='mt-1 text-gray-700'>
              {cryptoDetails.name} live price in US Dollar (USD). View value
              statistics, market cap and supply.
            </p>
          </div>

          <LineChart
            coinHistory={coinHistory}
            coinName={cryptoDetails.name}
            currentPrice={millify(cryptoDetails.price)}
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
            periods={periods}
            isFetchingChartData={isFetchingChartData}
          />

          <div className='mt-10 grid gap-6 grid-cols-1 md:grid-cols-2'>
            <div>
              <h5 className='text-xl font-semibold mb-4'>
                {cryptoDetails.name} Value Statistics
              </h5>
              <table className='min-w-full divide-y divide-gray-200'>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {stats.map(({ icon, title, value }) => (
                    <tr key={title}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <FontAwesomeIcon
                            className='flex-shrink-0 h-10 w-10'
                            icon={icon}
                          />
                          <div className='ml-4 text-sm font-medium text-gray-900'>
                            {title}
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                          {value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h5 className='text-xl font-semibold mb-4'>Other Stats Info</h5>
              <table className='min-w-full divide-y divide-gray-200'>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {genericStats.map(({ icon, title, value }) => (
                    <tr key={title}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <FontAwesomeIcon
                            className='flex-shrink-0 h-10 w-10'
                            icon={icon}
                          />
                          <div className='ml-4 text-sm font-medium text-gray-900'>
                            {title}
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                          {value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='mt-8 mb-6 grid gap-6 grid-cols-1 md:grid-cols-2'>
            <div>
              <h5 className='text-xl font-semibold mb-4'>
                About {cryptoDetails.name}
              </h5>
              <article className='prose 2xl:prose-lg'>
                {HTMLReactParser(cryptoDetails.description)}
              </article>
            </div>
            <div>
              <h5 className='text-xl font-semibold mb-4'>
                {cryptoDetails.name} Links
              </h5>
              <table className='min-w-full divide-y divide-gray-200'>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {cryptoDetails.links?.map(({ name, url, type }) => (
                    <tr key={name}>
                      <td className='whitespace-nowrap'>
                        <a
                          target='_blank'
                          rel='noreferrer'
                          href={url}
                          className='px-6 py-4 flex items-center text-sm font-medium text-gray-900'
                        >
                          {type}
                        </a>
                      </td>
                      <td className='whitespace-nowrap'>
                        <a
                          target='_blank'
                          rel='noreferrer'
                          href={url}
                          className='px-6 py-4 inline-flex w-full'
                        >
                          <span className='px-2 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            {name}
                          </span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className='col-span-4 text-center shadow-lg py-10 bg-white rounded-md'>
          <FontAwesomeIcon
            className='text-4xl text-red-600 mb-4'
            icon={faExclamationTriangle}
          />
          <h4 className='text-md font-semibold'>Not Found</h4>
        </div>
      )}
    </>
  );
};

export default CryptoDetails;
