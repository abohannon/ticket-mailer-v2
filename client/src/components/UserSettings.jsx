import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Icon, Input, Button,
} from 'antd';
import { CARD_TITLE_PRIMARY, CARD_TITLE_SECONDARY } from 'constants';

import { Card } from 'components/common';

const UserInfoForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.form.validateFields((error, values) => {
      if (error) return console.log(error);
      return console.log(values);
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="Email:">
        {
        getFieldDecorator('email', {
          rules: [],
        })(
          <Input />,
        )
      }
      </Form.Item>
      <Form.Item label="Name:">
        {
        getFieldDecorator('name', {
          rules: [],
        })(
          <Input />,
        )
      }
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  );
};

const WrappedUserInfoForm = Form.create()(UserInfoForm);

class UserSettings extends Component {
  handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target);
  }

  render() {
    return (
      <div>
        <Card
          title="User Settings"
          headStyle={CARD_TITLE_PRIMARY}
        >
          <WrappedUserInfoForm />
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
