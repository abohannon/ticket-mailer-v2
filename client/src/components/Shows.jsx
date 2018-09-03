import React, { Component } from 'react';
import { Card, Table } from 'components/common';

// Actions
import { fetchAllShows } from 'actions/shopifyActions';

class Shows extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllShows());
  }

  render() {
    return (
      <Card title="Current Shows">
        <div>SHOWS</div>
      </Card>
    );
  }
}

export default Shows;
