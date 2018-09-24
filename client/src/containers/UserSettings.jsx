import React from 'react';
import { connect } from 'react-redux';
import UserSettings from 'components/UserSettings';

const mapStateToProps = ({ authentication: { user } }) => ({ user });

export default connect(mapStateToProps)(UserSettings);
