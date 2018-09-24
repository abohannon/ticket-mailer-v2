import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

class UserInfoForm extends Component {
  constructor(props) {
    super(props);

    const { user } = this.props;

    this.state = {
      name: user.name,
      email: user.email,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  }

  handleChange = (event) => {
    event.preventDefault();

    const { target: { name, value } } = event;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Email:
            <Input name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <label>
            Name:
            <Input name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
        </div>
        <Button type="primary" htmlType="submit">Save</Button>
      </form>
    );
  }
}

export default UserInfoForm;
