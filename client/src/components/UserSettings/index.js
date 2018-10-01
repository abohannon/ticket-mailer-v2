import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CARD_TITLE_PRIMARY, CARD_TITLE_SECONDARY } from 'constants';

import { Card } from 'components/common';

// Components
import UserInfoForm from './UserInfoForm';

class UserSettings extends Component {
  render() {
    const userInfoFormProps = {
      user: this.props.user,
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

export default UserSettings;