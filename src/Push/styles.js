import styled, { keyframes, css } from 'styled-components';

const PushIn = direction => {
  return keyframes`
    from {
        transform: translateX(${direction === 'right' ? '+' : '-'}100%);
    }
    to {
        transform: 'translateX(0)'
    }
    `;
};

const PushOut = direction => {
  return keyframes`
    from {
        transform: 'translateX(0)'
    }
    to {
        transform: translateX(${direction === 'right' ? '+' : '-'}100%);
    }
    `;
};

export const PushingDiv = styled.div`
  position: fixed;
  width: ${props => props.width};
  z-index: 9999999999;
  top: 0;
  left: ${props => (props.direction === 'right' ? null : 0)};
  right: ${props => (props.direction === 'right' ? 0 : null)};
  height: 100vh;
  background: whitesmoke;
  animation: ${props => {
    return css`
      ${props.show
        ? PushIn(props.direction)
        : PushOut(props.direction)} 0.3s ease;
    `;
  }};
`;

export const PushingApp = styled.div`
  transition: transform 0.3s ease;
  transform: ${props =>
    props.push
      ? `translateX(${(props.direction === 'right' ? '-' : '+') + props.width})`
      : 'translateX(0)'};
`;
