import React, { Component } from 'react';
import { Table } from 'antd';
import { Card } from 'components/common';

class Tours extends Component {
  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.tour === 'Disabled User', // Column configuration not to be checked
        tour: record.tour,
      }),
    };

    const columns = [
      {
        title: 'Tour Name',
        dataIndex: 'tour',
      },
    ]

    const data = [
      {
        key: '1',
        tour: 'Circa Survive Anniversary Tour'
      },
      {
        key: '2',
        tour: 'Every Time I Die Fuck You Tour'
      },
    ]

    return (
      <Card title="Current Tours">
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </Card>
    );
  }
}

export default Tours;
