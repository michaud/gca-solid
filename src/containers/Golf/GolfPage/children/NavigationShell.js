import React from 'react';
import ButtonBar from './ButtonBar';
import { FlexContainer } from '@styles/layout.style';

const defaultStyle = { flex: 1, position: 'relative' };

const NavigationShell = ({ children }) => {

    return <FlexContainer vertical alignitems="stretch" flex="1">
        <div style={ defaultStyle }>
            { children }
        </div>
        <ButtonBar/>
    </FlexContainer>;
};

export default NavigationShell;
