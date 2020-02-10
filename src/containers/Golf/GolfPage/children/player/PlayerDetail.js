import React, { useState, useMemo } from 'react';

import playerShape from '@golfcontexts/player-shape.json';
import displayStates from '@golfutils/displayStates';

import getFieldDisplayData from '@golfutils/getFieldDisplayData';
import EditActions from '@containers/Golf/components/EditActions';
import PlayerForm from '@containers/Golf/GolfPage/children/player/PlayerForm';

import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@golfstyles/layout.style';


const PlayerDetail = ({
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

    if(!player.iri) return <PlayerForm
        title={ `Create ${ target }` }
        actionLabel={ `Save ${ target }` }
        onSave={ onSaveHandler }
        onCancel={ cancelEdit }
        player={ player }/>;

    if(displayState === displayStates.edit) return <PlayerForm
        title={ `Edit ${ target }` }
        actionLabel={ `Save ${ target }` }
        onSave={ onSaveHandler }
        onCancel={ cancelEdit }
        player={ player }/>

    if(displayState === displayStates.detail) {

        const handleDelete = typeof(onDelete) === 'function' ? onDeleteHandler : undefined ;
    
        return (
            <>
                <header className="c-header--sec">{ target }</header>
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
                        {
                            showEdit && <FlexItemTools>
                                <EditActions onEdit={ onEdit } onDelete={ handleDelete }/>
                            </FlexItemTools>
                        }
                        </FlexContainer>
                </FieldContainer>
            </>
        );
    }
};

export default PlayerDetail;
