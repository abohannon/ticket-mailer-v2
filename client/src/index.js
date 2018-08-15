import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './containers/AppContainer';

const rootEl = document.getElementById('root');

const renderApp = Component => render(
  <BrowserRouter>
    <Component />
  </BrowserRouter>,
  rootEl,
);

renderApp(AppContainer);
