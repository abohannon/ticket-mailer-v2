import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Card, Form, Icon, Input, Button,
} from 'antd'

const FormItem = Form.Item

const StyledCard = styled(Card)`
  display: flex;
  width: 300px;
`

const Title = styled.h1`
  color: white;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: .3rem;
  font-weight: 200;
  margin-bottom: 1rem;
`

const createStyles = () => ({
  iconStyle: {
    color: 'rgba(0,0,0, .25)',
  },
})

class Signup extends Component {
  componentDidMount() {
    const { form } = this.props
    form.validateFields()
  }

  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  handleSubmit = (event) => {
    event.preventDefault()
    const { handleSignup, form } = this.props

    form.validateFields((err, values) => {
      if (err) {
        console.log(err)
      }

      handleSignup(values)
    })
  };

  validateEmail = (rules, value, callback) => {
    const accepted = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)

    if (value && !accepted) {
      callback('Email not valid')
    } else {
      callback()
    }
  }

  checkPasswordStrength = (rules, value, callback) => {
    const accepted = /^(?=.*\d).{8,}$/.test(value)

    if (value && !accepted) {
      callback('Must contain min 8 characters + one number')
    } else {
      callback()
    }
  }

  comparePasswords = (rules, value, callback) => {
    const { form } = this.props

    if (value && value !== form.getFieldValue('password')) {
      callback('Password must match.')
    } else {
      callback()
    }
  }

  render() {
    const {
      form: {
        getFieldDecorator,
        getFieldsError,
        getFieldError,
        isFieldTouched,
      },
    } = this.props

    const { iconStyle } = createStyles()

    const cardProps = {
      bodyStyle: {
        width: '100%',
      },
    }

    const nameError = isFieldTouched('firstName') && getFieldError('firstName')
    const emailError = isFieldTouched('email') && getFieldError('email')
    const passwordError = isFieldTouched('password') && getFieldError('password')
    const confirmError = isFieldTouched('confirmPassword') && getFieldError('confirmPassword')

    return (
      <div>
        <Title>Ticket Mailer</Title>
        <StyledCard {...cardProps}>
          <Form onSubmit={this.handleSubmit} className="signup-form">
            <FormItem
              validateStatus={nameError ? 'error' : ''}
              help={nameError || ''}
            >
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'Please enter your first name.' }],
              })(
                <Input
                  prefix={<Icon type="user" style={iconStyle} />}
                  placeholder="First Name"
                />,
              )}
            </FormItem>
            <FormItem
              validateStatus={emailError ? 'error' : ''}
              help={emailError || ''}
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: 'Please enter your email.',
                }, {
                  validator: this.validateEmail,
                }],
              })(
                <Input
                  prefix={<Icon type="mail" style={iconStyle} />}
                  placeholder="Email"
                />,
              )}
            </FormItem>
            <FormItem
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please enter your password.',
                }, {
                  validator: this.checkPasswordStrength,
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={iconStyle} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </FormItem>
            <FormItem
              validateStatus={confirmError ? 'error' : ''}
              help={confirmError || ''}
            >
              {getFieldDecorator('confirmPassword', {
                rules: [{
                  required: true, message: 'Please confirm password.',
                }, {
                  validator: this.comparePasswords,
                }],
              })(
                <Input
                  prefix={<Icon type="lock" style={iconStyle} />}
                  type="password"
                  placeholder="Confirm password"
                />,
              )}
            </FormItem>
            <FormItem style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="signup-form-button"
                disabled={this.hasErrors(getFieldsError())}
                block
              >
              Create Account
              </Button>
            </FormItem>
          </Form>
        </StyledCard>
      </div>
    )
  }
}

export default Form.create()(Signup)
