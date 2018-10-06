import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import {
  Form, Input, TimePicker, DatePicker, Col, Button,
} from 'antd';

class EmailForm extends Component {
  static propTypes = {
    check_in: PropTypes.string,
    start_time: PropTypes.string,
    pickup_items: PropTypes.string,
    shipping_items: PropTypes.string,
    shipping_date: PropTypes.string,
    digital_items: PropTypes.string,
    digital_delivery_date: PropTypes.string,
    event_notes: PropTypes.string,
    onSave: PropTypes.func,
  }

  componentDidMount() {
    const { email, form } = this.props;

    if (!email.error) {
      const {
        check_in,
        start_time,
        pickup_items,
        shipping_items,
        shipping_date,
        digital_items,
        digital_delivery_date,
        event_notes,
      } = email;

      form.setFieldsValue({
        check_in: moment(check_in),
        start_time: moment(start_time),
        pickup_items,
        shipping_items,
        shipping_date: moment(shipping_date),
        digital_items,
        digital_delivery_date: moment(digital_delivery_date),
        event_notes,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { form, onSave } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const emailData = {
          check_in: values.check_in.format(),
          start_time: values.start_time.format(),
          pickup_items: values.pickup_items,
          shipping_items: values.shipping_items,
          shipping_date: values.shipping_date.format(),
          digital_items: values.digital_items,
          digital_delivery_date: values.digital_delivery_date.format(),
          event_notes: values.event_notes,
        };

        onSave(emailData);
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
