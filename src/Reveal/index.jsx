import React from 'react';
import PropTypes from 'prop-types';
import widthPropType from '../CustomProps/width';

const MenuContainerForReveal = ({ direction, width, children }) => {
  const menuContainerStyles = {
    position: 'fixed',
    width,
    top: 0,
    left: direction === 'right' ? null : 0,
    right: direction === 'right' ? 0 : null,
    height: '100vh',
    background: 'whitesmoke'
    // display: isMenuOpen ? 'block' : 'none'
  };

  return <div style={menuContainerStyles}>{children}</div>;
};

const AppContainerForReveal = ({
  direction,
  width,
  menuIsClosing,
  setIsMenuOpen,
  children
}) => {
  const appContainerStyles = {
    transform: menuIsClosing
      ? 'translateX(0)'
      : `translateX(${direction === 'right' ? '-' : '+'}${width})`,
    transition: 'transform 0.5s ease'
  };

  const onTransitionEnd = e => {
    if (menuIsClosing && e.currentTarget === e.target) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div style={appContainerStyles} onTransitionEnd={onTransitionEnd}>
      {children}
    </div>
  );
};

AppContainerForReveal.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  width: widthPropType.isRequired,
  menuIsClosing: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

MenuContainerForReveal.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  width: widthPropType.isRequired,
  children: PropTypes.node.isRequired
  // isMenuOpen: PropTypes.bool.isRequired
};

export { AppContainerForReveal, MenuContainerForReveal };
