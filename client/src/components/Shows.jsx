import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Tag } from 'antd';
import { Card, Table } from 'components/common';

// Actions
import { fetchAllShows } from 'actions/shopifyActions';

class Shows extends Component {
  static propTypes = {
    fetchAllShowsPending: PropTypes.object,
    fetchAllShowsResolved: PropTypes.object,
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllShows());
  }

  tableData = () => {
    const { fetchAllShowsResolved } = this.props;

    if (!isEmpty(fetchAllShowsResolved)) {
      return fetchAllShowsResolved.payload.map((show, index) => ({
        key: index,
        show: show.title,
        bundles: show.variants.map(variant => variant.title),
      }));
    }
    return [];
  };

  render() {
    const { fetchAllShowsPending } = this.props;

    const loading = !isEmpty(fetchAllShowsPending);

    const columns = [
      {
        title: 'Name',
        dataIndex: 'show',
        className: 'table-cell',
      },
      {
        title: 'Bundles',
        dataIndex: 'bundles',
        render: bundles => (
          <span>
            {bundles.map(bundle => (
              <Tag
                color="blue"
                key={bundle}
                onClick={() => console.log(bundle)}
              >
                {bundle}
              </Tag>
            ))}
          </span>
        ),
      },
    ];

    return (
      <Card title="Current Shows">
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

export default Shows;
