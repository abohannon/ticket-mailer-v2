import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { CARD_TITLE_PRIMARY, CARD_TITLE_SECONDARY } from 'constants';

import { Card, Table } from 'components/common';

// Actions
import { fetchOrders } from 'actions/shopifyActions';


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

class Orders extends Component {
  state = {
    activeTab: 'orders',
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    const searchQuery = location.search;

    dispatch(fetchOrders(searchQuery));
  }

  onTabChange = (key) => {
    this.setState({ activeTab: key });
  }

  render() {
    const {
      fetchOrdersPending,
      fetchOrdersResolved: { payload },
    } = this.props;

    const tabList = [{
      key: 'orders',
      tab: 'List',
    },
    {
      key: 'email',
      tab: 'Edit email',
    },
    ];

    const loading = !isEmpty(fetchOrdersPending);

    const tabListContent = {
      orders: <OrdersTable orders={payload} loading={loading} />,
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

const mapStateToProps = ({
  application: {
    fetchOrdersResolved,
    fetchOrdersPending,
    fetchOrdersRejected,
  },
}) => ({
  fetchOrdersResolved,
  fetchOrdersPending,
  fetchOrdersRejected,
});

export default connect(mapStateToProps)(Orders);
