import React from 'react';
import { Menu, Icon } from 'antd';
import styled from 'styled-components';

import { config } from '../config/sidebar';

const { Item } = Menu;

const menuProps = {
  style: {
    minWidth: '26rem',
  },
};

const Sidebar = props => (
  <Menu {...menuProps}>
    {
      config.map((item, index) => {
        if (item.name === 'Logout') {
          return <Item key={index} onClick={props.onLogout}>{item.name}</Item>;
        }
        return <Item key={index}>{item.name}</Item>;
      })
    }
  </Menu>
);

export default Sidebar;
