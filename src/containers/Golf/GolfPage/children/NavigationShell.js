import React from 'react';
import ButtonBar from './ButtonBar';

const defaultStyle = { flex: 1, position: 'relative' };

const NavigationShell = ({ children }) => {

    return <>
        <div style={ defaultStyle }>
            { children }
        </div>
        <ButtonBar/>
    </>;
};

export default NavigationShell;
