import styled from 'styled-components';

export const FlexContainer = styled.div`
    display: flex;
    align-items: ${props => props.center ? "center" : props.alignitems ? props.alignitems : "flex-start"};
    flex-direction: ${props => props.vertical ? "column" : "row"};
    flex: ${props => props.flex ? props.flex : "0"};
`;

export const HoleNavigatorContainer =  styled(FlexContainer)`
    height: 5.15rem;
    border-radius: 0;
    border-top: 1px solid rgb(210, 199, 157);
    border-bottom: 1px solid rgb(210, 199, 157);
    border-left: none;
    border-right: none;
    background: linear-gradient(171deg, rgb(245, 240, 214) 0%, rgb(220, 210, 173) 100%);
    font-weight: 700;
`;


export const FieldContainer = styled.div`
    margin-bottom: 1rem;
`;

export const FlexItem = styled.div`
    flex:${props => props.narrow ? "0" : "1"};
    align-items: ${props => props.alignitems ? props.alignitems : "normal"};
`;
export const FlexItemLabel = styled.div`min-width: 10rem;`;
export const FlexItemValue = styled.div`flex: 1;`;
export const FlexItemData = styled.div`flex: 1;`;
export const FlexItemTools = styled.div`flex: 0;`;

export const FlexItemRight = styled.div`
    flex: 1;
    text-align: right;
`;

export const FlexToolLeft = styled.div`
    flex: 0;
    text-align: left;
`;

export const FlexToolRight = styled.div`
    flex: 0;
    text-align: right;
`;
