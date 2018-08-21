import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';

import history from 'helpers/history';
import Root from 'Root';
import 'App.css';

import AppContainer from 'containers/AppContainer';

const rootEl = document.getElementById('root');

const renderApp = Component => render(
  <Root>
    <Router history={history}>
      <Component />
    </Router>
  </Root>,
  rootEl,
);

renderApp(AppContainer);
