import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import Main from 'components/Main';
import SideNav from 'components/SideNav';

const Wrapper = styled.main`
  display: flex;
  margin: 0 auto;
  max-width: 134rem;
  padding: 0 2rem 0 2rem;
  box-sizing: border-box;
`;

class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    application: PropTypes.object,
    routes: PropTypes.array,
    history: PropTypes.object,
    authentication: PropTypes.object,
  }

  componentDidMount() {
    const { history } = this.props;
    if (history.location.pathname === '/dashboard') {
      history.replace('/dashboard/tours', { from: '/dashboard' });
    }
  }

  render() {
    const {
      application, authentication: { user }, routes,
    } = this.props;

    return (
      <Wrapper>
        <SideNav />
        <Main user={user} application={application} routes={routes} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ application, authentication }) => ({ application, authentication });

export default connect(mapStateToProps)(Dashboard);
