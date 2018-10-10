import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  padding: 0 4rem 0 4rem;
  box-sizing: border-box;
`;

class Dashboard extends Component {
  static propTypes = {
    routes: PropTypes.array,
    history: PropTypes.object,
    authentication: PropTypes.object,
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    const { history } = this.props;
    if (history.location.pathname === '/dashboard') {
      history.replace('/dashboard/tours', { from: '/dashboard' });
    }
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const {
      authentication: { currentUser }, routes,
    } = this.props;

    return (
      <Wrapper className="wrapper-dashboard">
        <SideNav />
        <Main
          currentUser={currentUser}
          routes={routes}
          handleLogout={this.handleLogout}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

export default connect(mapStateToProps)(Dashboard);
