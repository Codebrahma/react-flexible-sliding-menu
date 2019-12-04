import React, { useState, createContext } from 'react';
import { useTransition, animated } from 'react-spring';

export const FancyContext = createContext();

const Fancy = props => {
  const { defaultState, MenuComponent, children, width, direction } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(defaultState || false);
  const [menuProps, _setMenuProps] = useState({});

  const transitions = useTransition(isMenuOpen, null, {
    from: {
      transform: `translateX(${direction === 'right' ? '+' : '-'}100%)`
    },
    enter: {
      transform: 'translateX(0)'
    },
    leave: {
      transform: `translateX(${direction === 'right' ? '+' : '-'}100%)`
    }
  });

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
      {transitions.map(
        ({ item, key, props: springProps }) =>
          item && (
            <animated.div
              key={key}
              style={{
                ...springProps,
                position: 'fixed',
                width: width || '250px',
                zIndex: 9999999999,
                top: 0,
                left: direction === 'right' ? null : 0,
                right: direction === 'right' ? 0 : null,
                height: '100vh',
                background: 'whitesmoke'
              }}
            >
              <MenuComponent {...menuProps} />
            </animated.div>
          )
      )}
      {children}
    </FancyContext.Provider>
  );
};

export default Fancy;
