import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CARD_TITLE_PRIMARY, CARD_TITLE_SECONDARY } from 'constants';

import { Card, Spacer } from 'components/common';

// Components
import UserInfoForm from 'components/UserSettings/UserInfoForm';
import TeamRoles from 'components/UserSettings/TeamRoles';

// Actions
import { updateUser, fetchUsers } from 'actions/userActions';

class UserSettings extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUsers());
  }

  updateUserInfo = (data) => {
    const { dispatch } = this.props;
    dispatch(updateUser(data));
  }

  render() {
    console.log(this.props);
    const { currentUser, user } = this.props;

    const userInfoFormProps = {
      currentUser,
      user,
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
        <Spacer />
        <Card
          title="Team roles"
          headStyle={CARD_TITLE_SECONDARY}
        >
          <TeamRoles isAdmin={currentUser.admin} users={user.fetchUsersResolved} />
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
