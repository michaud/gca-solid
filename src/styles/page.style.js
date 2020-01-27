import styled from 'styled-components';

export const PageContainer = styled.div`
    margin: 0 1rem 1rem 1rem;
    > * {
        margin-bottom: 2rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;
