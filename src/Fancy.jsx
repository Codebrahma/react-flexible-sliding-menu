import React, { useState, createContext } from 'react';

export const FancyContext = createContext();

const Fancy = props => {
  const { defaultState, MenuComponent, children } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(defaultState || false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <FancyContext.Provider value={{ openMenu, closeMenu }}>
      {isMenuOpen && (
        <div>
          <MenuComponent />
        </div>
      )}
      {children}
    </FancyContext.Provider>
  );
};

export default Fancy;
