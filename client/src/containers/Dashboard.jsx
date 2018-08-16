import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { logoutUser } from '../actions/authenticationActions';

class Dashboard extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
      Dashboard
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
      </div>
    );
  }
}

export default connect()(Dashboard);
