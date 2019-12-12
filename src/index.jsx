import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import SlidingDiv from './Slide';
import PushingDiv from './Push';
import { PushingApp } from './Push/styles';

export const MenuContext = createContext();

const MenuProvider = props => {
  const {
    defaultState,
    MenuComponent,
    children,
    width,
    direction,
    animation
  } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(defaultState || false);
  const [menuProps, _setMenuProps] = useState({});

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const setMenuProps = newMenuProps => {
    if (JSON.stringify(menuProps) !== JSON.stringify(newMenuProps))
      _setMenuProps(newMenuProps);
  };

  return (
    <MenuContext.Provider
      value={{ openMenu, closeMenu, toggleMenu, setMenuProps }}
    >
      {animation === 'push' ? (
        <>
          <PushingDiv show={isMenuOpen} direction={direction} width={width}>
            <MenuComponent {...menuProps} />
          </PushingDiv>
          <PushingApp push={isMenuOpen} direction={direction} width={width}>
            {children}
          </PushingApp>
        </>
      ) : (
        <>
          <SlidingDiv show={isMenuOpen} direction={direction} width={width}>
            <MenuComponent {...menuProps} />
          </SlidingDiv>
          {children}
        </>
      )}
    </MenuContext.Provider>
  );
};

MenuProvider.propTypes = {
  /**
   * Set's the initial state of the Menu i.e. Open or Close
   */
  defaultState: PropTypes.bool,
  takeChildrenHeight: PropTypes.bool,
  direction: PropTypes.oneOf(['left', 'right']),
  animation: PropTypes.oneOf(['slide', 'push']),
  MenuComponent: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  width: (props, propName, componentName) => {
    const { width } = props;
    const validCSSDimension = /^(\d+|\d*\.\d+)(px|rem|em|%|vw|vh|cm|mm|Q|in|pc|pt|ex|ch|lh|vmin|vmax)$/;
    if (!validCSSDimension.test(width)) {
      return new Error(
        `Invalid prop \`${propName}\` of value \`${width}\` supplied to \`${componentName}\`, expected a valid css length with unit (https://developer.mozilla.org/en-US/docs/Web/CSS/length).`
      );
    }
    return null;
  }
};

MenuProvider.defaultProps = {
  defaultState: false,
  takeChildrenHeight: false,
  width: '250px',
  direction: 'left',
  animation: 'slide'
};

export default MenuProvider;
