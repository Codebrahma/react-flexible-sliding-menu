import React, { useState, createContext } from 'react';

export const FancyContext = createContext();

const Fancy = props => {
  const { defaultState, MenuComponent, children } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(defaultState || false);
  const [menuProps, setMenuProps] = useState({});

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const memSetMenuProps = newMenuProps => {
    if (JSON.stringify(menuProps) !== JSON.stringify(newMenuProps))
      setMenuProps(newMenuProps);
  };

  return (
    <FancyContext.Provider value={{ openMenu, closeMenu, memSetMenuProps }}>
      {isMenuOpen && (
        <div>
          <MenuComponent {...menuProps} />
        </div>
      )}
      {children}
    </FancyContext.Provider>
  );
};

export default Fancy;
