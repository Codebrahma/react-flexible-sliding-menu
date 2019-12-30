import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import widthPropType from './CustomProps/width';
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
  const [menuIsClosing, setMenuIsClosing] = useState(false);
  const [menuProps, _setMenuProps] = useState({});

  const openMenu = () => {
    setIsMenuOpen(true);
    setMenuIsClosing(false);
  };

  const closeMenu = () => {
    setMenuIsClosing(true);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
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
          {isMenuOpen && (
            <SlidingDiv
              direction={direction}
              width={width}
              menuIsClosing={menuIsClosing}
              setIsMenuOpen={setIsMenuOpen}
            >
              <MenuComponent {...menuProps} />
            </SlidingDiv>
          )}
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
  width: widthPropType
};

MenuProvider.defaultProps = {
  defaultState: false,
  takeChildrenHeight: false,
  width: '250px',
  direction: 'left',
  animation: 'slide'
};

export default MenuProvider;
