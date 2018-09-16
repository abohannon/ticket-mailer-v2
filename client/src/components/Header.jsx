import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import { BOX_SHADOW } from 'constants';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  top: 0;
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
    Header!
    <IconWrapper>
      <StyledIcon type="user" />
    </IconWrapper>
  </Wrapper>
);

export default Header;
