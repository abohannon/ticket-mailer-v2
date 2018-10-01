import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CARD_TITLE_PRIMARY, CARD_TITLE_SECONDARY } from 'constants';

import { Card, Table } from 'components/common';


const OrdersTable = (props) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];

  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
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
