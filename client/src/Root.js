/* This wrapper component is needed for Jest/Enzyme testing to work properly */
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';

export default ({ children }) => {
  const middlewares = [thunk];

  if (NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = composeEnhancers(applyMiddleware(...middlewares))(createStore)(reducers);

  return <Provider store={store}>{children}</Provider>;
};
