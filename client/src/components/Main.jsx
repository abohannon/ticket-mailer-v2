import React, { Component } from 'react';
import styled from 'styled-components';
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
    const { render, user } = this.props;

    return (
      <Wrapper>
        <Header user={user} />
        <Spacer />
        {render()}
      </Wrapper>
    );
  }
}

export default Main;
