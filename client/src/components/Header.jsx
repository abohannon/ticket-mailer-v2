import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Button, Menu, Dropdown, Icon,
} from 'antd';
import { BOX_SHADOW } from 'constants';

// Actions
import { logoutUser } from 'actions/authenticationActions';

// Components
import { SearchInput } from 'components/common';

const StyledIcon = styled(Icon)`
  margin-right: 1rem; 
  font-size: 1.5rem;
`;

const HeaderMenu = (props) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <StyledIcon type="setting" />
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => props.dispatch(logoutUser())}>
        <StyledIcon type="logout" />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      {props.children}
    </Dropdown>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  top: 0;
`;

const UserDisplay = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const Greeting = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  margin-right: 2rem;
`;

const StyledButton = styled(Button)`
  box-shadow: ${BOX_SHADOW};
`;

const propTypes = {
  showSearchBar: PropTypes.bool,
  user: PropTypes.object,
};

const Header = (props) => {
  const { showSearchBar, user } = props;
  return (
    <Wrapper>
      <SearchInput show={showSearchBar} />
      <UserDisplay>
        <Greeting>{`Welcome back, ${user.name}!`}</Greeting>
        <HeaderMenu {...props}>
          <StyledButton shape="circle" icon="user" size="medium" />
        </HeaderMenu>
      </UserDisplay>
    </Wrapper>
  );
};

Header.propTypes = propTypes;

export default connect()(Header);
