import styled from 'styled-components';

export const PageContainer = styled.div`
    padding: 1rem 1rem 2rem 1rem;
    overflow-y: scroll;
    height: calc(100vh - 10.8rem);

    > * {

        margin-bottom: 2rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export const PageContent = styled.div`

    max-width: 40rem;
    margin: 0 auto;
`;
