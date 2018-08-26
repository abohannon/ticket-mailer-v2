import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';

// Components
import { Menu, MenuItem } from 'components/Menu';
import { Spacer } from 'components/common';

// Styles
const Wrapper = styled.nav`
  min-width: 26rem;
  padding: 2rem;
  font-size: 1.4rem;
`;

const StyledIcon = styled(Icon)`
  margin-right: 1rem; 
  font-size: 1.8rem;
`;

const Header = styled.div`
  display: flex;
`;

const Title = styled.h3`
  text-transform: uppercase;
  letter-spacing: .2rem;
`;

class Sidebar extends Component {
  static propTypes = {
    onLogout: PropTypes.func,
  }

  render() {
    return (
      <Wrapper className="side-nav">
        <Header>
          <Title>Ticket Mailer</Title>
        </Header>
        <Spacer />
        <Menu>
          <MenuItem path="/dashboard" index={0}>
            <StyledIcon type="profile" />
            Tours
          </MenuItem>
          <MenuItem path="/dashboard" index={1}>
            <StyledIcon type="environment-o" />
            Shows
          </MenuItem>
          <MenuItem path="/dashboard" index={2}>
            <StyledIcon type="mail" />
            Sent Emails
          </MenuItem>
          <Spacer />
          <MenuItem path="/" index={3} onClick={this.props.onLogout}>
            <StyledIcon type="logout" />
            Logout
          </MenuItem>
        </Menu>
      </Wrapper>
    );
  }
}

export default Sidebar;