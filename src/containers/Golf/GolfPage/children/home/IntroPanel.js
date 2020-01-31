import React from 'react';

import { FlexContainer } from '@styles/layout.style';

const IntroPanel = ({ icon, children, ...rest }) => {

    const { className = '' } = rest;

    return (
        <div className={ `c-intro-panel ${ className }` }>
            <FlexContainer alignitems="center">
                <div className="c-intro-panel__icon">{ icon }</div>
                <div className="c-intro-panel__content">
                    { children }
                </div>
            </FlexContainer>
        </div>
    );
};

export default IntroPanel;
