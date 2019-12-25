import styled from 'styled-components';

export const PageContainer = styled.div`
    margin: 0 2rem 2rem 2rem;
    > * {
        margin-bottom: 2rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;
