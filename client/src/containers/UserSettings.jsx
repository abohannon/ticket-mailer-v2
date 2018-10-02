import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CARD_TITLE_PRIMARY, CARD_TITLE_SECONDARY } from 'constants';

import { Card } from 'components/common';

// Components
import UserInfoForm from 'components/UserSettings/UserInfoForm';

// Actions
import { updateUser } from 'actions/userActions';

class UserSettings extends Component {
  updateUserInfo = (data) => {
    const { dispatch } = this.props;

    dispatch(updateUser(data));
  }

  render() {
    const userInfoFormProps = {
      currentUser: this.props.currentUser,
      user: this.props.user,
      updateUserInfo: this.updateUserInfo,
    };

    return (
      <div>
        <Card
          title="User Settings"
          headStyle={CARD_TITLE_PRIMARY}
        >
          <UserInfoForm {...userInfoFormProps} />
        </Card>
        <Card
          title="User roles"
          headStyle={CARD_TITLE_SECONDARY}
        >
          User roles
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({
  authentication: { currentUser },
  user,
}) => ({
  currentUser,
  user,
});

export default connect(mapStateToProps)(UserSettings);
