import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Components
import Login from '../components/Login';

// Actions
import { loginUser } from '../actions/authenticationActions';

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
  render() {
    const { dispatch } = this.props;

    return (
      <Wrapper className="wrapper-landing">
        <Login handleLogin={loginData => dispatch(loginUser(loginData))} />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

export default connect(mapStateToProps)(Landing);
