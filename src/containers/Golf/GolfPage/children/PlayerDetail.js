import React, { useState } from 'react';

//import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import playerShape from '@contexts/player-shape.json';
import displayStates from '@utils/displayStates';
import golf from '@utils/golf-namespace';
import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@styles/layout.style';
import PlayerForm from './PlayerForm';

const getFieldData = (field, player) => {

    const label = field.label;

    let value = '';

    switch(field.type) {

        case golf.types.text: {

            value = player.fields[field.predicate].field.value;

            break;
        }
        
        case golf.types.integer: {

            value = player.fields[field.predicate].field.value;

            break;
        }
        
        default: {
            value = 'error';
            console.error('no field type', field)
        }
    }
    
    return { value, label };
};

const PlayerDetail = ({ player, onSave, onDelete, title = 'Player' }) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);

    //const [playerState, setPlayerState] = useState();
    //const { t } = useTranslation();


    const onEdit = () => {

        setDisplayState(displayStates.edit);
    }

    const cancelEdit = () => {

        setDisplayState(displayStates.detail);
    };

    const onDeleteHandler = () => {

        onDelete(player);
    };

    const fields = [];
    
    playerShape.shape.forEach(field => {
        
        const data = getFieldData(field, player);
        fields.push(data);
    });

    if(!player.iri || displayState === displayStates.edit) return <PlayerForm
        title={ title }
        onSave={ onSave }
        onCancel={ cancelEdit }
        player={ player }/>;

    if(displayState === displayStates.detail) {

        return (
            <>
            <header className="c-header">{ title }</header>
            <FieldContainer>
                <FlexContainer>
                    <FlexItemData>
                    {
                        fields.map((field, index) => <FlexContainer key={ index }>
                            <FlexItemLabel>{ field.label }</FlexItemLabel>
                            <FlexItemValue>{ field.value }</FlexItemValue>
                        </FlexContainer>)
                    }
                    </FlexItemData>
                    <FlexItemTools>
                        <IconButton
                            aria-label="delete"
                            onClick={ onEdit }>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={ onDeleteHandler }>
                            <DeleteIcon />
                        </IconButton>
                    </FlexItemTools>
                </FlexContainer>
            </FieldContainer>
            </>
        );
    }
};

export default PlayerDetail;
