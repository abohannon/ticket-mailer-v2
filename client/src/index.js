import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import history from './helpers/history';
import './App.css';

import reducers from './reducers';
import AppContainer from './containers/AppContainer';

const rootEl = document.getElementById('root');

const middlewares = [thunk];

if (NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = composeEnhancers(applyMiddleware(...middlewares))(createStore)(reducers);

const renderApp = Component => render(
  <Provider store={store}>
    <Router history={history}>
      <Component />
    </Router>
  </Provider>,
  rootEl,
);

renderApp(AppContainer);
