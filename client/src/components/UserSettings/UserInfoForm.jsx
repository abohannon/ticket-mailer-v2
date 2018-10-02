import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Button } from 'antd';

const StyledForm = styled.form`
  width: 30rem;
`;

const StyledLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
`;

const InputWrapper = styled.div`
  padding-bottom: 2rem;
`;

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
      <StyledForm onSubmit={this.handleSubmit}>
        <InputWrapper>
          <StyledLabel>
            Email:
            <Input name="email" value={this.state.email} onChange={this.handleChange} />
          </StyledLabel>
        </InputWrapper>
        <InputWrapper>
          <StyledLabel>
            Name:
            <Input name="name" value={this.state.name} onChange={this.handleChange} />
          </StyledLabel>
        </InputWrapper>
        <Button type="primary" htmlType="submit">Save</Button>
      </StyledForm>
    );
  }
}

export default UserInfoForm;
