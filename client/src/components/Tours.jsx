import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Card, Table } from 'components/common';

// Actions
import { fetchTours } from 'actions/shopifyActions';

class Tours extends Component {
  static propTypes = {
    fetchToursPending: PropTypes.object,
    fetchToursResolved: PropTypes.object,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTours());
  }

  tableData = () => {
    const { fetchToursResolved } = this.props;

    if (!isEmpty(fetchToursResolved)) {
      return fetchToursResolved.payload.map((tour, index) => ({
        key: index,
        tour: tour.title,
      }));
    }
    return [];
  };

  render() {
    const { fetchToursPending } = this.props;

    const columns = [
      {
        dataIndex: 'tour',
        className: 'table-cell',
        render: text => <a href="#">{text}</a>,
      },
    ];

    const loading = !isEmpty(fetchToursPending);

    return (
      <Card
        title="Current Tours"
        style={{ minHeight: 400 }}
        loading={loading}
      >
        <Table
          columns={columns}
          dataSource={this.tableData()}
          pagination={false}
          showHeader={false}
          loading={loading}
        />
      </Card>
    );
  }
}

export default Tours;
