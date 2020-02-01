import React, { useState, useMemo } from 'react';

import playerShape from '@contexts/player-shape.json';
import displayStates from '@utils/displayStates';

import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@styles/layout.style';

import PlayerForm from './PlayerForm';
import getFieldDisplayData from '@utils/getFieldDisplayData';
import EditActions from '@containers/Golf/components/EditActions';

const MarkerDetail = ({
    player,
    onSave,
    onDelete,
    target = 'Player',
    showEdit = false
}) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);

    const onSaveHandler = (player) => {
        
        onSave(player);
        setDisplayState(displayStates.detail);
    };

    const onEdit = () => {

        setDisplayState(displayStates.edit);
    };

    const cancelEdit = () => {

        setDisplayState(displayStates.detail);
    };

    const onDeleteHandler = () => {

        onDelete(player);
    };

    const displayFields = useMemo(() => {

        const displayFields = [];

        playerShape.shape.forEach(field => {
            
            const data = getFieldDisplayData(field, player);
            displayFields.push(data);
        });

        return displayFields;

    }, [player]);

    const handleDelete = typeof(onDelete) === 'function' ? onDeleteHandler : undefined ;

    const markerDescription = player ? `${
        player.givenName.value
    } ${
        player.familyName.value
    }, ${
        player.handicap.value
    }` : '';

    return (
        <div className="c-detail__container">
            <FlexContainer alignitems="center">
                <FlexItemData vertical alignitems="center">
                    <div>{ markerDescription }</div>
                </FlexItemData>
                <FlexItemTools>
                    <EditActions onEdit={ onEdit }/>
                </FlexItemTools>
            </FlexContainer>
            { displayState === displayStates.edit ? (
                <PlayerForm
                    title={ `Edit ${ target }` }
                    actionLabel={ `Save ${ target }` }
                    onSave={ onSaveHandler }
                    onCancel={ cancelEdit }
                    onDelete={ handleDelete }
                    player={ player }/>
                ) : null
            }
        </div>
    );
};

export default MarkerDetail;
