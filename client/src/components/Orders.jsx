import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CARD_TITLE_PRIMARY, CARD_TITLE_SECONDARY } from 'constants';

import { Card, Table } from 'components/common';


const OrdersTable = (props) => {
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

  const data = [{
    key: '1',
    orderNumber: '#100',
    name: 'John Brown',
    email: 'john@email.com',
    status: 'Unsent',
  },
  {
    key: '2',
    orderNumber: '#101',
    name: 'Ashley Smith',
    email: 'ashley@email.com',
    status: 'Unsent',
  },
  {
    key: '3',
    orderNumber: '#102',
    name: 'Adam Bo',
    email: 'adam@email.com',
    status: 'Unsent',
  }];

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
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
  );
};

class Orders extends Component {
  state = {
    activeTab: 'orders',
  }

  onTabChange = (key) => {
    console.log(key);
    this.setState({ activeTab: key });
  }

  render() {
    const tabList = [{
      key: 'orders',
      tab: 'List',
    },
    {
      key: 'email',
      tab: 'Edit email',
    },
    ];

    const tabListContent = {
      orders: <OrdersTable />,
      email: <p>Edit email form</p>,
    };

    return (
      <Fragment>
        <Card
          title="Orders"
          headStyle={CARD_TITLE_PRIMARY}
          tabList={tabList}
          activeTabKey={this.state.activeTab}
          onTabChange={key => this.onTabChange(key)}
          fullWidth
        >
          {tabListContent[this.state.activeTab]}
        </Card>
      </Fragment>
    );
  }
}

export default Orders;
