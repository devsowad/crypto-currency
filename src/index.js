import ReactDom from 'react-dom';
import React from 'react';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './app/store';
import App from './App';
import { Provider } from 'react-redux';

ReactDom.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
