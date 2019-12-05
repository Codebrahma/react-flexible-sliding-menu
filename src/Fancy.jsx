import React, { useState, createContext } from 'react';
import SlidingDiv from './Slide';
import PushingDiv from './Push';
import { PushingApp } from './Push/styles';

export const FancyContext = createContext();

const Fancy = props => {
  const {
    defaultState,
    MenuComponent,
    children,
    width = '250px',
    direction = 'left',
    animation = 'slide'
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
    <FancyContext.Provider
      value={{ openMenu, closeMenu, toggleMenu, setMenuProps }}
    >
      {animation === 'slide' ? (
        <>
          <SlidingDiv show={isMenuOpen} direction={direction} width={width}>
            <MenuComponent {...menuProps} />
          </SlidingDiv>
          {children}
        </>
      ) : (
        <>
          <PushingDiv show={isMenuOpen} direction={direction} width={width}>
            <MenuComponent {...menuProps} />
          </PushingDiv>
          <PushingApp push={isMenuOpen} direction={direction} width={width}>
            {children}
          </PushingApp>
        </>
      )}
    </FancyContext.Provider>
  );
};

export default Fancy;
