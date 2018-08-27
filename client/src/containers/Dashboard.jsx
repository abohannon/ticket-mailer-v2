import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import Main from 'components/Main';
import SideNav from 'components/SideNav';

// Actions
import { logoutUser } from 'actions/authenticationActions';
import { fetchTours } from 'actions/shopifyActions';

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
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTours());
  }

  render() {
    const { dispatch, application } = this.props;
    return (
      <Wrapper>
        <SideNav onLogout={() => dispatch(logoutUser())} />
        <Main application={application} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ application }) => ({ application });

export default connect(mapStateToProps)(Dashboard);
