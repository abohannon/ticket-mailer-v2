import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { AUTH_USER } from 'actions/types';
import { BLUE, LIGHT_BLUE } from 'constants';

// Components
import Login from 'components/Login';

// Actions
import { loginUser, authenticateUser } from 'actions/authenticationActions';

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  background: ${BLUE};
  background: linear-gradient(142deg, ${BLUE} 0%, ${LIGHT_BLUE} 100%);
`;

export class Landing extends Component {
  static propTypes = {
    authentication: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    const {
      authentication: { isAuthenticated },
      history,
      dispatch,
    } = this.props;

    if (isAuthenticated) {
      history.push('/dashboard');
    }

    const token = localStorage.getItem('id_token');

    if (token && !isAuthenticated) {
      dispatch(authenticateUser(token));
    }
  }

  componentDidUpdate(prevProps) {
    const { authentication: { isAuthenticated }, history } = this.props;

    // if (!prevProps.isAuthenticated && isAuthenticated) {
    //   history.push('/dashboard/tours');
    // }
  }

  render() {
    const { dispatch, authentication } = this.props;

    if (authentication && !isEmpty(authentication.pending)
      && authentication.pending.type === AUTH_USER) {
      return null;
    }

    return (
      <Wrapper className="wrapper-landing">
        <Login handleLogin={loginData => dispatch(loginUser(loginData))} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

export default connect(mapStateToProps)(Landing);
