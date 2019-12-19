import { keyframes, createGlobalStyle } from 'styled-components';
const transitionClassName = 'slide';
const duration = 450;

const slideOut = keyframes`
0% { opacity: 1; }
25% { opacity: .5; transform: translateZ(-50px); }
75% { opacity: .1; transform: translateZ(-50px) translateX(20%); }
100% { opacity: 0; transform: translateZ(-50px) translateX(20%); }
`;

const slideIn = keyframes`
0%, 25% { opacity: 0; transform: translateZ(-50px) translateX(-20%); }
75% { opacity: .75; transform: translateZ(-50px); }
100% { opacity: 1; transform: translateZ(0) translateX(0); }
`;
// eslint-disable-next-line
const GlobalStyle = createGlobalStyle`.${transitionClassName}-enter, .${transitionClassName}-exit {
  position: absolute;
  top: 0;
  width: 100%;
}
.${transitionClassName}-exit-active {
  animation: ${slideOut} ${duration}ms both ease;
}
.${transitionClassName}-enter-active {
  animation: ${slideIn} ${duration}ms both ease;
}`;

export default { transition: transitionClassName, duration };
