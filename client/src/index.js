import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppContainer from './containers/AppContainer';

const rootEl = document.getElementById('root');

// const store = createStore({});

const renderApp = Component => render(
  <Provider>
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  </Provider>,
  rootEl,
);

renderApp(AppContainer);
