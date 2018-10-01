import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CARD_TITLE_PRIMARY, CARD_TITLE_SECONDARY } from 'constants';

import { Card } from 'components/common';

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
      tab: 'Orders',
    },
    {
      key: 'email',
      tab: 'Edit email',
    },
    ];

    const tabListContent = {
      orders: <p>Orders list</p>,
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
        >
          {tabListContent[this.state.activeTab]}
        </Card>
      </Fragment>
    );
  }
}

export default Orders;
