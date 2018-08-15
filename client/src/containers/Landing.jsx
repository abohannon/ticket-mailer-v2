import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login';

import { loginUser } from '../actions/authenticationActions';

class Landing extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <Login handleLogin={loginData => dispatch(loginUser(loginData))} />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

export default connect(mapStateToProps)(Landing);
