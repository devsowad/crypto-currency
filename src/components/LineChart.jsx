import React, { Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import { Listbox, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { SelectorIcon } from '.';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const LineChart = ({
  coinHistory,
  currentPrice,
  coinName,
  periods,
  setTimePeriod,
  timePeriod,
  isFetchingChartData,
}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#D97706',
        borderColor: '#D97706',
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <div className='mb-4'>
          <h5 className='text-xl font-semibold'>{coinName} Price Chart </h5>
          <div className='flex flex-wrap text-sm text-gray-700 space-x-4'>
            <p>Change: {coinHistory?.data?.change}%</p>
            <p>
              Current {coinName} Price: $ {currentPrice}
            </p>
          </div>
        </div>
        <div className='flex items-center'>
          {isFetchingChartData && (
            <FontAwesomeIcon
              className='mr-2 text-2xl'
              icon={faCircleNotch}
              spin
            />
          )}
          <Listbox value={timePeriod} onChange={setTimePeriod}>
            <div className='mt-1 relative w-full'>
              <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm'>
                <span className='ml-3 block truncate'>{timePeriod}</span>
                <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <SelectorIcon />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                  {periods.map(period => (
                    <Listbox.Option
                      key={period}
                      className={({ active }) =>
                        classNames(
                          active
                            ? 'text-white bg-secondary-600'
                            : 'text-gray-900',
                          'cursor-pointer select-none relative py-2'
                        )
                      }
                      value={period}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {period}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-secondary-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div className='w-full'>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
