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
import { fetchOrders } from 'actions/applicationActions';
import { fetchEmail, saveEmail, sendEmail } from 'actions/emailActions';

class Orders extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    location: PropTypes.object,
    fetchEmailResolved: PropTypes.object,
    fetchOrdersPending: PropTypes.object,
    fetchOrdersResolved: PropTypes.object,
    saveEmailResolved: PropTypes.object,
    saveEmailRejected: PropTypes.object,
  }

  state = {
    activeTab: 'orders',
    selectedOrders: [],
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

  saveEmailContent = (data) => {
    const { dispatch, location } = this.props;

    const mergedData = {
      ...data,
      variant_id: location.state.variantId,
      searchQuery: location.search,
    };

    dispatch(saveEmail(mergedData));
  }

  updateSelectedOrders = (selectedOrders) => {
    this.setState({ selectedOrders });
  }

  sendEmail = (orders) => {
    const { fetchEmailResolved, location } = this.props;

    const { artistName, showTitle, variantTitle } = location.state;

    if (fetchEmailResolved.payload.error) {
      return console.log('You haven\'t saved an email yet.');
    }

    const emailData = {
      content: fetchEmailResolved.payload,
      orders,
      artistName,
      showTitle,
      variantTitle,
    };

    console.log(emailData);
  }

  render() {
    const {
      fetchOrdersPending,
      fetchOrdersResolved,
      fetchEmailResolved,
      saveEmailResolved,
      saveEmailRejected,
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
    const emailSaved = !isEmpty(saveEmailResolved);
    const emailSaveError = !isEmpty(saveEmailRejected);
    const disabled = this.state.selectedOrders.length < 1;

    const sendEmailButton = (
      <Button
        type="primary"
        disabled={disabled}
        onClick={() => this.sendEmail(this.state.selectedOrders)}
      >
        Send Email
      </Button>
    );

    const tabListContent = {
      orders: (
        <OrdersList
          orders={orders}
          loading={loading}
          onUpdate={this.updateSelectedOrders}
        />
      ),
      email: (
        <EmailForm
          email={email}
          onSave={this.saveEmailContent}
          saveSuccess={emailSaved}
          saveError={emailSaveError}
        />
      ),
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
  },
  email: {
    fetchEmailResolved,
    saveEmailResolved,
    saveEmailRejected,
  },
}) => ({
  fetchOrdersResolved,
  fetchOrdersPending,
  fetchOrdersRejected,
  fetchEmailResolved,
  saveEmailResolved,
  saveEmailRejected,
});

export default connect(mapStateToProps)(Orders);
