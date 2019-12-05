import React, { useEffect, useState } from 'react';
import { PushingDiv } from './styles';

const Push = ({ show, children, direction, width }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <PushingDiv
        show={show}
        width={width}
        direction={direction}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </PushingDiv>
    )
  );
};

export default Push;
