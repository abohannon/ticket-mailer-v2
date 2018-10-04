import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'components/common';

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
  },
  ];

  const renderTableData = () => {
    const { orders } = props;

    if (orders && orders.length > 0) {
      return (
        orders.map((order, index) => ({
          key: index,
          orderNumber: order.name,
          name: `${order.customer.first_name} ${order.customer.last_name}`,
          email: order.customer.email,
          status: order.email_sent ? 'Sent' : 'Unsent',
        }))
      );
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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

export default OrdersList;
