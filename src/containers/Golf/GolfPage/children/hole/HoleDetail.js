import React, { useState } from 'react';

import holeShape from '@golfcontexts/hole-shape.json';
import getFieldDisplayData from '@golfutils/getFieldDisplayData';
import displayStates from '@golfutils/displayStates';

import EditActions from '@golf/components/EditActions';
import HoleForm from '@golf/GolfPage/children/hole/HoleForm';

import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@golfstyles/layout.style';

const HoleDetail = ({
    hole,
    onSave,
    onDelete,
    target = 'hole'
}) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);    

    const onSaveHandler = (hole) => {

        onSave(hole);
    }

    const onEdit = () => {

        setDisplayState(displayStates.edit);
    };

    const cancelEdit = () => {

        setDisplayState(displayStates.detail);
    };

    const onDeleteHandler = () => {

        onDelete(hole);
    };

    if(displayState === displayStates.edit) return <HoleForm
        title={ `Edit ${ target }` }
        actionLabel={ `Save ${ target }` }
        onSave={ onSaveHandler }
        onCancel={ cancelEdit }
        hole={ hole }/>;

    if(displayState === displayStates.detail) {

        const displayFields = [];

        holeShape.shape.forEach(field => {
                        
            const data = getFieldDisplayData(field, hole);
            displayFields.push(data);
        });

        return (
            <FieldContainer>
                <FlexContainer>
                    <FlexItemData>
                        {
                            displayFields.map((field, index) => <FlexContainer key={ `${ field.predicate }${ index}` }>
                                <FlexItemLabel>{ field.label }</FlexItemLabel>
                                <FlexItemValue>{ field.value }</FlexItemValue>
                            </FlexContainer>)
                        }
                    </FlexItemData>
                    <FlexItemTools>
                        <EditActions onEdit={ onEdit } onDelete={ onDeleteHandler }/>
                    </FlexItemTools>
                </FlexContainer>
            </FieldContainer>
        );
    }
};

export default HoleDetail;
