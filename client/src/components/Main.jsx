import React, { Component } from 'react';
import styled from 'styled-components';
import Tours from 'components/Tours';

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
    const {
      fetchToursPending,
      fetchToursRejected,
      fetchToursResolved,
    } = this.props.application;

    const toursProps = {
      fetchToursPending,
      fetchToursRejected,
      fetchToursResolved,
    };

    return (
      <Wrapper>
        <Tours {...toursProps} />
      </Wrapper>
    );
  }
}

export default Main;
