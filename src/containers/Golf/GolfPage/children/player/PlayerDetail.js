import React, { useState, useMemo } from 'react';

//import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

const PlayerDetail = ({
    player,
    onSave,
    onDelete,
    target = 'player'
}) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);
    //const { t } = useTranslation();

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

        const fields = [];

        playerShape.shape.forEach(field => {
            
            const data = getFieldDisplayData(field, player);
            fields.push(data);
        });

        return fields;

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

        const showDelete = typeof(onDelete) === 'function' ? true : false;
    
        return (<>
            <header className="c-header">{ target }</header>
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
                        <IconButton
                            aria-label="edit"
                            onClick={ onEdit }>
                            <EditIcon />
                        </IconButton>
                        {
                            showDelete && <IconButton
                                aria-label="delete"
                                onClick={ onDeleteHandler }>
                                <DeleteIcon />
                            </IconButton>
                        }
                    </FlexItemTools>
                </FlexContainer>
            </FieldContainer>
            </>
        );
    }
};

export default PlayerDetail;
