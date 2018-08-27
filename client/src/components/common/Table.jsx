import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';

const propTypes = {
  pagination: PropTypes.bool,
  showHeader: PropTypes.bool,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
};

const Table = (props) => {
  const {
    pagination,
    showHeader,
    columns,
    dataSource,
    loading,
  } = props;

  return (
    <AntTable
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      showHeader={showHeader}
      loading={loading}
    />
  );
};

Table.propTypes = propTypes;

export { Table };
