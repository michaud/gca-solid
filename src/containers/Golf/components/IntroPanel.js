import React from 'react';

import { FlexContainer } from '@golfstyles/layout.style';

const IntroPanel = ({
    icon,
    children,
    ...rest
}) => {

    const { className = '' } = rest;

    return (
        <div className={ `c-intro-panel ${ className }` }>
            <FlexContainer alignitems="center" flex="1">
                <div className="c-intro-panel__icon">{ icon }</div>
                <div className="c-intro-panel__content">
                    { children }
                </div>
            </FlexContainer>
        </div>
    );
};

export default IntroPanel;
