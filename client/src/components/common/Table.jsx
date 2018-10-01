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

const Table = props => (
  <AntTable
    {...props}
  />
);

Table.propTypes = propTypes;

export { Table };
