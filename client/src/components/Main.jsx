import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch } from 'react-router-dom';

import RouteHandler from 'routes/RouteHandler';
import Header from 'components/Header';
import { Spacer } from 'components/common';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 76rem;
  max-width: 108rem;
  width: 100%;
  padding-top: 2rem;
`;

class Main extends Component {
  state = {
    showSearchBar: false,
  }

  toggleSearchBar = () => {
    this.setState(prevState => ({ showSearchBar: !prevState.showSearchBar }));
  }

  render() {
    const { routes, currentUser, handleLogout } = this.props;
    const { showSearchBar } = this.state;

    return (
      <Wrapper>
        <Header
          currentUser={currentUser}
          showSearchBar={showSearchBar}
          handleLogout={handleLogout}
        />
        <Spacer />
        <Switch>
          {routes.map((route, i) => (
            <RouteHandler
              key={`dashboard-${i}`}
              toggleSearchBar={this.toggleSearchBar}
              {...route}
            />
          ))}
        </Switch>
      </Wrapper>
    );
  }
}

export default Main;
