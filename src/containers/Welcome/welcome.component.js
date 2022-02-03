import React from 'react';
import { Link } from 'react-router-dom';
import {
  WelcomeWrapper,
} from './welcome.style';
import { SplashScreen } from '@containers/Golf/GolfPage/children';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const WelcomePageContent = props => {
  const { webId } = props;

  return (
    <WelcomeWrapper data-testid="welcome-wrapper">
      { !webId ? <>
        <SplashScreen>
          <div className="splash-intro">
            <div className="splash-login">
              <p><Link to="/login">log-in</Link></p>
            </div>
            <div className="splash-intro__content">
              <p>this app uses a Solid Pod to save your golf data.<br/>
                Pods are where you store your data. Any kind of data can be stored in a Solid Pod. Once stored in a Pod, you control who can access your data.</p>
              <div>
                <p><Link to="https://solidproject.org/">Solid: Your data, your choice</Link></p>
                <p><Link to="/register">Register</Link></p>
              </div>
            </div>
          </div>
        </SplashScreen>
        </> : <div>loggedin</div> } 
    </WelcomeWrapper>
  );
};
