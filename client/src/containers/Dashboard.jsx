import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

// Actions
import { logoutUser } from '../actions/authenticationActions';

const Wrapper = styled.main`
  display: flex;
  margin: 0 auto;
  max-width: 134rem;
`;

class Dashboard extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Wrapper>
        <Sidebar onLogout={() => dispatch(logoutUser())} />
        <Main />
      </Wrapper>
    );
  }
}

export default connect()(Dashboard);
