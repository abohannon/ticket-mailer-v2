import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { AUTH_USER } from '../actions/types';

// Components
import Login from '../components/Login';

// Actions
import { loginUser, authenticateUser } from '../actions/authenticationActions';

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  background: rgb(47,47,204);
  background: linear-gradient(142deg, rgba(47,47,204,1) 0%, rgba(0,144,255,1) 100%);
`;

class Landing extends Component {
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

    if (!prevProps.isAuthenticated && isAuthenticated) {
      history.push('/dashboard');
    }
  }

  render() {
    const { dispatch, authentication } = this.props;

    if (!isEmpty(authentication.pending)
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
