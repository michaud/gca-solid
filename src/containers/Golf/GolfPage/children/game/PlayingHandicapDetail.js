import React, { useState, useEffect } from 'react';

import displayStates from '@utils/displayStates';
import EditActions from '@containers/Golf/components/EditActions';
import playingHandicapShape from '@contexts/playing-handicap-shape.json';
import golf from '@utils/golf-namespace';
import PLayingHandicapForm from './PLayingHandicapForm';

import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@styles/layout.style';

const getFieldData = (field, handicap) => {

    let value = '';

    switch(field.type) {

        case golf.types.string: {

            value = handicap[field.predicate].value;

            break;
        }
        
        case golf.types.integer: {

            value = handicap[field.predicate].value;

            break;
        }

        default: {

            value = 'error';
            console.error('no field type', field)
        }
    }
    
    return {
        value,
        label: field.label
    };
};

const PlayingHandicapDetail = ({ handicap, onChange }) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);
    const [handicapState, setHandicapState] = useState();
    const onEdit = () => setDisplayState(displayStates.edit);
    //const cancelEdit = () => setDisplayState(displayStates.detail);

    const displayFields = [];

    useEffect(() => {

        if (handicap) {
            setHandicapState(handicap);
        }

    }, [handicap]);

    if(handicapState) {
        playingHandicapShape.shape.forEach(field => {
        
            const data = getFieldData(field, handicapState);
            displayFields.push(data);
        });
    }

    if(onChange !== undefined || displayState === displayStates.edit) {
        return (
            <PLayingHandicapForm handicap={ handicapState } onChange={ onChange }/>
        );
    }

    return (
        <div className="c-box">
            <header className="c-header--sec">Playing handicap</header>
            <FieldContainer>
                <FlexContainer>
                    <FlexItemData>
                    {
                        displayFields.map((field, index) => <FlexContainer key={ index }>
                            <FlexItemLabel>{ field.label }</FlexItemLabel>
                            <FlexItemValue>{ field.value }</FlexItemValue>
                        </FlexContainer>)
                    }
                    </FlexItemData>
                    <FlexItemTools>
                        <EditActions onEdit={ onEdit }/>
                    </FlexItemTools>
                </FlexContainer>
            </FieldContainer>
        </div>
    );
};

export default PlayingHandicapDetail;
