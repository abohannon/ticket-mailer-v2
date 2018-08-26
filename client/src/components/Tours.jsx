import React, { Component } from 'react';
import { Card, Table } from 'components/common';

class Tours extends Component {
  render() {
    const columns = [
      {
        dataIndex: 'tour',
        className: 'table-cell',
        render: text => <a href="#">{text}</a>,
      },
    ];

    const data = [
      {
        key: 1,
        tour: 'Circa Survive Anniversary Tour',
      },
      {
        key: 2,
        tour: 'Every Time I Die Fuck You Tour',
      },
    ];

    return (
      <Card
        title="Current Tours"
        bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 1 }}
        style={{ minHeight: 400 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          showHeader={false}
        />
      </Card>
    );
  }
}

export default Tours;
