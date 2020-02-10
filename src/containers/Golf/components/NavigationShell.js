import React from 'react';

import styled from 'styled-components';

import ButtonBar from '@containers/Golf/components/ButtonBar';
import { FlexContainer } from '@golfstyles/layout.style';

const Container = styled.div`
    flex: 1;
    position: relative;
`;

const NavigationShell = ({ children }) => (
    <FlexContainer vertical alignitems="stretch" flex="1">
        <Container>{ children }</Container>
        <ButtonBar/>
    </FlexContainer>
);

export default NavigationShell;
