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
  render() {
    const { routes, application, user } = this.props;

    return (
      <Wrapper>
        <Header user={user} />
        <Spacer />
        <Switch>
          {routes.map((route, i) => (
            <RouteHandler
              key={`dashboard-${i}`}
              {...route}
              {...application}
            />
          ))}
        </Switch>
      </Wrapper>
    );
  }
}

export default Main;
