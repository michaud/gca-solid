import { keyframes } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const transitionClassName = 'scale';
const duration = 300;

const moveFromRight = keyframes`from { transform: translateX(10%); }`;
const scaleDown = keyframes`to { opacity: 0; transform: scale(.8); }`;

// eslint-disable-next-line
const GlobalStyle = createGlobalStyle`.${transitionClassName}-enter, .${transitionClassName}-exit {
position: absolute;
top: 0;
width: 100%;
}
.${transitionClassName}-enter-active {
  animation: ${moveFromRight} 600ms ease both;
  z-index: 2;
}
.${transitionClassName}-exit-active {
  animation: ${scaleDown} 300ms ease both;
  z-index: 1;
}`;

export default { transition: transitionClassName, duration, GlobalStyle };
