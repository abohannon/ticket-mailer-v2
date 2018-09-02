import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

// Components
import Main from 'components/Main';
import SideNav from 'components/SideNav';
import Tours from 'components/Tours';

// Actions
import { logoutUser } from 'actions/authenticationActions';
import { fetchTours } from 'actions/shopifyActions';

import RouteHandler from '../routes/RouteHandler';

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
  }

  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch(fetchTours());
  // }

  render() {
    const { dispatch, application, routes } = this.props;

    const toursProps = {
      fetchToursPending: application.fetchToursPending,
      fetchToursRejected: application.fetchToursRejected,
      fetchToursResolved: application.fetchToursResolved,
    };

    return (
      <Wrapper>
        <SideNav onLogout={() => dispatch(logoutUser())} />
        <Main render={() => (
          <Switch>
            {routes.map((route, i) => (
              <RouteHandler
                key={`dashboard ${i}`}
                {...route}
                {...application}
              />
            ))}
          </Switch>
        )}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ application }) => ({ application });

export default connect(mapStateToProps)(Dashboard);
