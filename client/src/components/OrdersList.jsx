import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Tooltip } from 'antd';
import { Table } from 'components/common';

const propTypes = {
  onUpdate: PropTypes.func,
  loading: PropTypes.bool,
  orders: PropTypes.array,
};

const OrdersList = (props) => {
  const columns = [{
    title: 'Order #',
    dataIndex: 'orderNumber',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  }];

  const renderStatusMessage = (status) => {
    const { email_sent, email_error } = status;

    if (email_sent) {
      return <Badge status="success" text="Sent" />;
    }

    if (email_error) {
      return (
        <Tooltip title={email_error.message}>
          <Badge status="error" text="Error" />
        </Tooltip>
      );
    }

    return <Badge status="default" text="Unsent" />;
  };

  const renderTableData = () => {
    const { orders } = props;

    if (orders && orders.length > 0) {
      return (
        orders.map((order, index) => ({
          key: index,
          orderNumber: order.name,
          name: `${order.customer.first_name} ${order.customer.last_name}`,
          email: order.customer.email,
          status: renderStatusMessage(order),
          id: order.id,
        }))
      );
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const filteredRowData = selectedRows.map((row) => {
        const { key, status, ...rest } = row;

        return rest;
      });

      props.onUpdate(filteredRowData);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={renderTableData()}
      pagination={false}
      loading={props.loading}
    />
  );
};

OrdersList.propTypes = propTypes;

export default OrdersList;
