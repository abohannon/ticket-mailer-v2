import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';

const propTypes = {
  pagination: PropTypes.bool,
  showHeader: PropTypes.bool,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
};

const Table = (props) => {
  const {
    pagination,
    showHeader,
    columns,
    dataSource,
  } = props;

  return (
    <AntTable
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      showHeader={showHeader}
    />
  );
};

Table.propTypes = propTypes;

export { Table };
