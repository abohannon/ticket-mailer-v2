import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

// Components
import { Menu, MenuItem } from './Menu';

// Config
import { configTop, configBottom } from '../config/sideNav';

// Styles
const Wrapper = styled.nav`
  min-width: 26rem;
  padding: 2rem;
  font-size: 1.4rem;
`;

class Sidebar extends Component {
  renderConfig = config => (
    config.map((item, index) => (
      <MenuItem
        key={item.name}
        path={item.path}
        index={index}
      >
        {
          item.icon && (
            <Icon
              type={item.icon}
              style={{ marginRight: '1rem', fontSize: '1.8rem' }}
            />
          )
        }
        { item.name }
      </MenuItem>
    ))
  );

  render() {
    return (
      <Wrapper className="side-nav">
        <Menu>
          {this.renderConfig(configTop)}
        </Menu>
        <Menu>
          {this.renderConfig(configBottom)}
        </Menu>
      </Wrapper>
    );
  }
}

export default Sidebar;
