import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export const SearchInput = (props) => {
  if (!props.show) return null;

  return (
    <Search
      placeholder="Search"
      onSearch={value => console.log(value)}
      style={{ width: 300 }}
    />
  );
};
