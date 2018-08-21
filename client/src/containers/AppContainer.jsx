import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Components
import Routes from 'routes/Routes';

class AppContainer extends Component {
  render() {
    return (
      <div className="app-container">
        <Routes />
      </div>
    );
  }
}

export default hot(module)(AppContainer);
