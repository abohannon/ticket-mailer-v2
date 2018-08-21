import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import Main from 'components/Main';
import SideNav from 'components/SideNav';


// Actions
import { logoutUser } from 'actions/authenticationActions';

const Wrapper = styled.main`
  display: flex;
  margin: 0 auto;
  max-width: 134rem;
  padding: 0 2rem 0 2rem;
  box-sizing: border-box;
`;

class Dashboard extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Wrapper>
        <SideNav onLogout={() => dispatch(logoutUser())} />
        <Main />
      </Wrapper>
    );
  }
}

export default connect()(Dashboard);
