import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import './App.css';


import reducers from './reducers';
import AppContainer from './containers/AppContainer';

const rootEl = document.getElementById('root');

const middlewares = [thunk];

if (NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);

const renderApp = Component => render(
  <Provider store={store}>
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  </Provider>,
  rootEl,
);

renderApp(AppContainer);
