import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './slide.css';

const Slide = ({ show, children, direction, width }) => {
  const [shouldRender, setRender] = useState(show);

  const styles = {
    position: 'fixed',
    width,
    zIndex: 9999999999,
    top: 0,
    left: direction === 'right' ? null : 0,
    right: direction === 'right' ? 0 : null,
    height: '100vh',
    background: 'whitesmoke'
  };

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div
        style={styles}
        className={classNames({
          [`slideInFrom-${direction}`]: show,
          [`slideOutFrom-${direction}`]: !show
        })}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

export default Slide;
