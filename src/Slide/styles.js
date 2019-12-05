import styled, { keyframes, css } from 'styled-components';

const SlideIn = direction => {
  return keyframes`
    from {
        transform: translateX(${direction === 'right' ? '+' : '-'}100%);
    }
    to {
        transform: 'translateX(0)'
    }
    `;
};

const SlideOut = direction => {
  return keyframes`
    from {
        transform: 'translateX(0)'
    }
    to {
        transform: translateX(${direction === 'right' ? '+' : '-'}100%);
    }
    `;
};

const SlidingDiv = styled.div`
  position: fixed;
  width: 250px;
  z-index: 9999999999;
  top: 0;
  left: ${props => (props.direction === 'right' ? null : 0)};
  right: ${props => (props.direction === 'right' ? 0 : null)};
  height: 100vh;
  background: whitesmoke;
  animation: ${props => {
    return css`
      ${props.show
        ? SlideIn(props.direction)
        : SlideOut(props.direction)} .3s ease;
    `;
  }};
`;

export default SlidingDiv;
