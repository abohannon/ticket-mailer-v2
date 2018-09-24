import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import { Card, Table } from 'components/common';
import { formatUrlString } from 'helpers/util';
import { CARD_TITLE_PRIMARY } from 'constants';

// Actions
import { fetchTours } from 'actions/shopifyActions';

class Tours extends Component {
  static propTypes = {
    fetchToursPending: PropTypes.object,
    fetchToursResolved: PropTypes.object,
    dispatch: PropTypes.func,
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
        tour_id: tour.collection_id,
      }));
    }
    return [];
  };

  render() {
    const { fetchToursPending } = this.props;

    const loading = !isEmpty(fetchToursPending);

    const columns = [
      {
        title: 'Name',
        dataIndex: 'tour',
        className: 'table-cell',
        render: (text, record, index) => (
          <Link to={{
            pathname: `shows/${formatUrlString(text)}`,
            search: `?collection_id=${record.tour_id}`,
          }}
          >
            {text}
          </Link>
        ),
      },
    ];

    return (
      <Card
        title="Current Tours"
        style={{ minHeight: 400 }}
        headStyle={CARD_TITLE_PRIMARY}
        fullWidth
      >
        <Table
          columns={columns}
          dataSource={this.tableData()}
          pagination={false}
          showHeader
          loading={loading}
        />
      </Card>
    );
  }
}

export default Tours;
