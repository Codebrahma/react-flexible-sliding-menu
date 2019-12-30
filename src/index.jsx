import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import widthPropType from './CustomProps/width';
import MenuContainerForSlide from './Slide';
import MenuContainerForPush, { AppContainerForPush } from './Push';

export const MenuContext = createContext();

const MenuProvider = props => {
  const {
    openByDefault,
    MenuComponent,
    children,
    width,
    direction,
    animation
  } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(openByDefault || false);
  const [menuIsClosing, setMenuIsClosing] = useState(true);
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
          {isMenuOpen && (
            <MenuContainerForPush
              direction={direction}
              width={width}
              menuIsClosing={menuIsClosing}
              setIsMenuOpen={setIsMenuOpen}
            >
              <MenuComponent {...menuProps} />
            </MenuContainerForPush>
          )}
          <AppContainerForPush
            direction={direction}
            width={width}
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            menuIsClosing={menuIsClosing}
          >
            {children}
          </AppContainerForPush>
        </>
      ) : (
        <>
          {isMenuOpen && (
            <MenuContainerForSlide
              direction={direction}
              width={width}
              menuIsClosing={menuIsClosing}
              setIsMenuOpen={setIsMenuOpen}
            >
              <MenuComponent {...menuProps} />
            </MenuContainerForSlide>
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
  openByDefault: PropTypes.bool,
  takeChildrenHeight: PropTypes.bool,
  direction: PropTypes.oneOf(['left', 'right']),
  animation: PropTypes.oneOf(['slide', 'push']),
  MenuComponent: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  width: widthPropType
};

MenuProvider.defaultProps = {
  openByDefault: false,
  takeChildrenHeight: false,
  width: '250px',
  direction: 'left',
  animation: 'slide'
};

export default MenuProvider;
