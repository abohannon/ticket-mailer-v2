import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BLUE, DARK_BLUE, LIGHT_BLUE } from '../constants';

const Wrapper = styled.nav`
  min-width: 26rem;
  padding: 2rem;
`;

const UnorderedList = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  margin-bottom: 1.5rem;
`;

const InnerContent = styled.div`
  display: flex;
  align-items: center;
  color: ${props => (props.active ? LIGHT_BLUE : DARK_BLUE)};
  font-weight: ${props => (props.active ? 500 : null)};
`;

const MenuItem = (props) => {
  const {
    children,
    style,
    path,
    index,
    onMenuItemClick,
    activeIndex,
  } = props;

  const active = activeIndex === index;

  return (
    <ListItem style={{ ...style }} onClick={() => onMenuItemClick(index)}>
      <Link to={path} style={{ textDecoration: 'none' }}>
        <InnerContent active={active}>
          {children}
        </InnerContent>
      </Link>
    </ListItem>
  );
};

class Menu extends Component {
  state = {
    activeIndex: 0,
  }

  onMenuItemClick = (index) => {
    this.setState({ activeIndex: index }, () => console.log(this.state));
  }

  render() {
    const { children, style } = this.props;

    const childProps = {
      onMenuItemClick: this.onMenuItemClick,
      activeIndex: this.state.activeIndex,
    };

    const childrenWithProps = React.Children.map(children, child => (
      React.cloneElement(child, childProps)
    ));

    return (
      <Wrapper className="menu__inner-wrapper" style={{ ...style }}>
        <UnorderedList>
          {childrenWithProps}
        </UnorderedList>
      </Wrapper>
    );
  }
}

export { Menu, MenuItem };
