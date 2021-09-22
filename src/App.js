import React, { useState } from 'react';
import {
  Drawer,
  Home,
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
  News,
  Appbar,
  Backdrop,
} from './components';
import { Route, Switch } from 'react-router';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-row min-h-screen bg-gray-100 text-gray-800'>
      <Backdrop isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <main className='container sm:max-w-full flex flex-col flex-grow -ml-64 xl:ml-0 transition-all duration-150 ease-in'>
        <Appbar onClose={() => setIsOpen(!isOpen)} />

        <div className='main-content flex flex-col flex-grow p-4'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/cryptocurrencies'>
              <Cryptocurrencies />
            </Route>
            <Route exact path='/crypto/:coinId'>
              <CryptoDetails />
            </Route>
            <Route exact path='/exchanges'>
              <Exchanges />
            </Route>
            <Route exact path='/news'>
              <News />
            </Route>
          </Switch>
        </div>

        <div className='p-4 text-center'>
          Copyright © 2021 <a href='/'>Cryptoverse Inc</a>. All Rights Reserved.
        </div>
      </main>
    </div>
  );
};

export default App;
