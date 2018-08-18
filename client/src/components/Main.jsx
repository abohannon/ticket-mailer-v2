import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 76rem;
  max-width: 108rem;
  width: 100%;
`;

class Main extends Component {
  render() {
    return (
      <Wrapper>
        <div>
        Box 1
        </div>
        <div>
        Box 2
        </div>
      </Wrapper>
    );
  }
}

export default Main;
