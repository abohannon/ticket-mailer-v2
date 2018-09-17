import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import { BOX_SHADOW } from 'constants';

import { SearchInput } from 'components/common';

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

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 50%;
  background-color: white;
  width: 2.8rem;
  height: 2.8rem;
  margin-left: auto;
  box-shadow: ${BOX_SHADOW};
`;

const StyledIcon = styled(Icon)`
  font-size: 1.8rem;
`;

const Header = props => (
  <Wrapper>
    <SearchInput show={props.showSearchBar} />
    <UserDisplay>
      <Greeting>{`Welcome back, ${props.user.name}!`}</Greeting>
      <IconWrapper>
        <StyledIcon type="user" />
      </IconWrapper>
    </UserDisplay>
  </Wrapper>
);

export default Header;
