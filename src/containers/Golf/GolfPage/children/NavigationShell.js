import React from 'react';

import styled from 'styled-components';

import ButtonBar from './ButtonBar';
import { FlexContainer } from '@styles/layout.style';

const Container = styled.div`
    flex: 1;
    position: relative;
`;
const NavigationShell = ({ children }) => {

    return <FlexContainer vertical alignitems="stretch" flex="1">
        <Container>
            { children }
        </Container>
        <ButtonBar/>
    </FlexContainer>;
};

export default NavigationShell;
