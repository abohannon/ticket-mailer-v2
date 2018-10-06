import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { CARD_TITLE_PRIMARY } from 'constants';
import { Button } from 'antd';

import { Card } from 'components/common';
import OrdersList from 'components/OrdersList';
import EmailForm from 'components/EmailForm';

// Actions
import { fetchOrders, fetchEmail } from 'actions/applicationActions';

class Orders extends Component {
  state = {
    activeTab: 'orders',
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    const searchQuery = location.search;

    dispatch(fetchOrders(searchQuery));
    dispatch(fetchEmail(searchQuery));
  }

  onTabChange = (key) => {
    this.setState({ activeTab: key });
  }

  render() {
    const {
      fetchOrdersPending,
      fetchOrdersResolved,
      fetchEmailResolved,
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

    const orders = fetchOrdersResolved.payload;
    const email = fetchEmailResolved.payload;
    const loading = !isEmpty(fetchOrdersPending);
    const sendEmailButton = <Button type="primary">Send Email</Button>;

    const tabListContent = {
      orders: <OrdersList orders={orders} loading={loading} />,
      email: <EmailForm email={email} />,
    };

    return (
      <Fragment>
        <Card
          title="Orders"
          headStyle={CARD_TITLE_PRIMARY}
          tabList={tabList}
          activeTabKey={this.state.activeTab}
          onTabChange={key => this.onTabChange(key)}
          fullWidth={this.state.activeTab === 'orders'}
          extra={this.state.activeTab === 'orders' && sendEmailButton}
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
    fetchEmailResolved,
  },
}) => ({
  fetchOrdersResolved,
  fetchOrdersPending,
  fetchOrdersRejected,
  fetchEmailResolved,
});

export default connect(mapStateToProps)(Orders);
