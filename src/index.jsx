import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import widthPropType from './CustomProps/width';
import MenuContainerForSlide from './Slide';
import MenuContainerForPush, { AppContainerForPush } from './Push';
import { MenuContainerForReveal, AppContainerForReveal } from './Reveal';

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

  const renderContents = () => {
    switch (animation) {
      case 'push':
        return (
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
              menuIsClosing={menuIsClosing}
            >
              {children}
            </AppContainerForPush>
          </>
        );
      case 'reveal':
        return (
          <>
            {isMenuOpen && (
              <MenuContainerForReveal
                direction={direction}
                width={width}
                menuIsClosing={menuIsClosing}
                // isMenuOpen={isMenuOpen}
              >
                <MenuComponent {...menuProps} />
              </MenuContainerForReveal>
            )}
            <AppContainerForReveal
              direction={direction}
              width={width}
              menuIsClosing={menuIsClosing}
              setIsMenuOpen={setIsMenuOpen}
            >
              {children}
            </AppContainerForReveal>
          </>
        );
      default:
        return (
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
        );
    }
  };

  return (
    <MenuContext.Provider
      value={{ openMenu, closeMenu, toggleMenu, setMenuProps }}
    >
      {renderContents()}
    </MenuContext.Provider>
  );
};

MenuProvider.propTypes = {
  /**
   * Set's the initial state of the Menu i.e. Open or Close
   */
  openByDefault: PropTypes.bool,
  direction: PropTypes.oneOf(['left', 'right']),
  animation: PropTypes.oneOf(['slide', 'push', 'reveal']),
  MenuComponent: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  width: widthPropType
};

MenuProvider.defaultProps = {
  openByDefault: false,
  width: '250px',
  direction: 'left',
  animation: 'slide'
};

export default MenuProvider;
