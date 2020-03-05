import React, {
    useState,
    useEffect
} from 'react';

import playingHandicapShape from '@golfcontexts/playing-handicap-shape.json';
import displayStates from '@golfutils/displayStates';
import golf from '@golfconstants/golf-namespace';

import EditActions from '@golf/components/EditActions';
import PLayingHandicapForm from '@golfpagectrl/game/PLayingHandicapForm';

import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@golfstyles/layout.style';

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

        if (handicap) setHandicapState(handicap);

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
            <header className="c-header nudge">Playing handicap</header>
            <FieldContainer>
                <FlexContainer>
                    <FlexItemData>
                    {
                        displayFields.map((field, index) => <FlexContainer key={ `${ field.predicate }${ index }` }>
                            <FlexItemLabel>{ field.label }</FlexItemLabel>
                            <FlexItemValue>{ field.value }</FlexItemValue>
                        </FlexContainer>)
                    }
                    </FlexItemData>
                    {
                        onChange !== undefined ? 
                            <FlexItemTools>
                                <EditActions onEdit={ onEdit }/>
                            </FlexItemTools> :
                            null
                    }
                </FlexContainer>
            </FieldContainer>
        </div>
    );
};

export default PlayingHandicapDetail;
