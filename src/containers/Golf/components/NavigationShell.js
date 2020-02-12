import React from 'react';

import styled from 'styled-components';

import ButtonBar from '@golf/components/ButtonBar';
import { FlexContainer, FlexItem } from '@golfstyles/layout.style';

const Container = styled.div`
    flex: 1;
    position: relative;
`;

const NavigationShell = ({ children }) => (
    <FlexContainer vertical alignitems="stretch" flex="1">
        <Container>{ children }</Container>
        <div className="c-btn-bar__container">
            <ButtonBar/>
        </div>
    </FlexContainer>
);

export default NavigationShell;
