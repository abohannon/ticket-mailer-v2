import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Tag } from 'antd';
import { Card, Table } from 'components/common';
import { CARD_TITLE_PRIMARY } from 'constants';

// Actions
import { fetchShows } from 'actions/shopifyActions';

class Shows extends Component {
  static propTypes = {
    fetchShowsPending: PropTypes.object,
    fetchShowsResolved: PropTypes.object,
    dispatch: PropTypes.func,
    location: PropTypes.object,
    toggleSearchBar: PropTypes.func,
  }

  componentDidMount() {
    const { dispatch, location, toggleSearchBar } = this.props;
    const searchQuery = location.search;

    toggleSearchBar();
    dispatch(fetchShows(searchQuery));
  }

  componentWillUnmount() {
    const { toggleSearchBar } = this.props;
    toggleSearchBar();
  }

  tableData = () => {
    const { fetchShowsResolved } = this.props;

    if (!isEmpty(fetchShowsResolved)) {
      return fetchShowsResolved.payload.map((show, index) => ({
        key: index,
        show: show.title,
        bundles: show.variants.map(variant => ({
          title: variant.title,
          email_sent: variant.email_sent,
        })),
      }));
    }
    return [];
  };

  render() {
    const { fetchShowsPending } = this.props;

    const loading = !isEmpty(fetchShowsPending);

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
                color={bundle.email_sent ? 'green' : 'blue'}
                key={bundle.title}
                onClick={() => console.log(bundle.title)}
              >
                {bundle.title}
              </Tag>
            ))}
          </span>
        ),
      },
    ];

    return (
      <Card
        title="Current Shows"
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

export default Shows;
