import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import {
  Form, Input, TimePicker, DatePicker, Col, Button,
} from 'antd';

class EmailForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Form values', values);
      }
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };

    const FormItem = Form.Item;

    const { form: { getFieldDecorator } } = this.props;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Check-in"
            {...formItemLayout}
          >
            {getFieldDecorator('check_in')(
              <TimePicker
                use12Hours
                format="h:mm a"
              />,
            )}
          </FormItem>
          <FormItem
            label="Start"
            {...formItemLayout}
          >
            {getFieldDecorator('start_time')(
              <TimePicker
                use12Hours
                format="h:mm a"
              />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Items for pickup"
          >
            {getFieldDecorator('pickup_items')(
              <Input />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Items shipping"
          >
            <Col span={16}>
              <FormItem>
                {getFieldDecorator('shipping_items')(
                  <Input />,
                )}
              </FormItem>
            </Col>
            <Col span={2} />
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('shipping_date')(
                  <DatePicker />,
                )}
              </FormItem>
            </Col>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Items delivered digitally"
          >
            <Col span={16}>
              <FormItem>
                {getFieldDecorator('digital_items')(
                  <Input />,
                )}
              </FormItem>
            </Col>
            <Col span={2} />
            <Col span={6}>
              <FormItem>
                {getFieldDecorator('digital_delivery_date')(
                  <DatePicker />,
                )}
              </FormItem>
            </Col>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Event Notes"
          >
            {getFieldDecorator('event_notes')(
              <Input.TextArea rows={4} />,
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 8 }}>
            <Button htmlType="submit">
              Save Email
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(EmailForm);
