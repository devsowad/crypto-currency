import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCoins } from '@fortawesome/free-solid-svg-icons';
import { SelectorIcon } from '.';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SelectNews({ coins, selected, setSelected }) {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setItems(filteredCoins);
  }, [search, coins]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className='mt-1 relative w-full'>
        <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm'>
          <span className='flex items-center'>
            {selected.iconUrl ? (
              <img
                src={selected.iconUrl}
                alt='icon'
                className='flex-shrink-0 h-6 w-6 rounded-full'
              />
            ) : (
              <FontAwesomeIcon icon={faCoins} />
            )}
            <span className='ml-3 block truncate'>{selected.name}</span>
          </span>
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
          <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
            <div className='p-2'>
              <input
                className='w-full px-3 py-2 rounded border-2 focus:outline-none focus:ring-2 focus:ring-secondary-400'
                type='search'
                autoFocus
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Listbox.Option
              className={({ active }) =>
                classNames(
                  active ? 'text-white bg-secondary-600' : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-3 pr-9'
                )
              }
              value={{ name: 'Cryptocurrencies' }}
            >
              {({ selected, active }) => (
                <>
                  <div className='cursor-pointer flex items-center'>
                    <FontAwesomeIcon className='mx-1.5' icon={faCoins} />
                    <span
                      className={classNames(
                        selected ? 'font-semibold' : 'font-normal',
                        'ml-3 block truncate'
                      )}
                    >
                      All
                    </span>
                  </div>

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
            {items.map(coin => (
              <Listbox.Option
                key={coin.uuid}
                className={({ active }) =>
                  classNames(
                    active ? 'text-white bg-secondary-600' : 'text-gray-900',
                    'cursor-pointer select-none relative py-2 pl-3 pr-9'
                  )
                }
                value={coin}
              >
                {({ selected, active }) => (
                  <>
                    <div className='flex items-center'>
                      <img
                        src={coin.iconUrl}
                        alt='icon'
                        className='flex-shrink-0 h-6 w-6 rounded-full'
                      />
                      <span
                        className={classNames(
                          selected ? 'font-semibold' : 'font-normal',
                          'ml-3 block truncate'
                        )}
                      >
                        {coin.name}
                      </span>
                    </div>

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
  );
}
