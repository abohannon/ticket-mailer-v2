import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 76rem;
  max-width: 108rem;
  width: 100%;
  padding-top: 2rem;
`;

class Main extends Component {
  componentDidMount() {
    console.log('Main mounted');
  }

  render() {
    const { render } = this.props;

    return (
      <Wrapper>
        {render()}
      </Wrapper>
    );
  }
}

export default Main;
