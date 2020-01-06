import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import widthPropType from '../CustomProps/width';

const Slide = ({
  direction,
  width,
  menuIsClosing,
  setIsMenuOpen,
  children
}) => {
  const [menuIsOpening, setMenuIsOpening] = useState(false);

  const menuContainerStyles = {
    position: 'fixed',
    width,
    zIndex: 999,
    top: 0,
    left: direction === 'right' ? null : 0,
    right: direction === 'right' ? 0 : null,
    height: '100vh',
    background: 'whitesmoke',
    transform: menuIsOpening
      ? 'translateX(0)'
      : `translateX(${direction === 'right' ? '+' : '-'}100%)`,
    transition: 'transform 0.5s ease'
  };

  useEffect(() => {
    setMenuIsOpening(true);
  }, []);

  useEffect(() => {
    if (menuIsClosing) setMenuIsOpening(false);
  }, [menuIsClosing]);

  const onTransitionEnd = e => {
    if (menuIsClosing && e.currentTarget === e.target) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div style={menuContainerStyles} onTransitionEnd={onTransitionEnd}>
      {children}
    </div>
  );
};

Slide.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  width: widthPropType.isRequired,
  menuIsClosing: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Slide;
