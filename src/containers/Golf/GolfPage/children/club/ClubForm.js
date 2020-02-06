import React, { useState, useEffect, useContext } from 'react';

import update from 'immutability-helper';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import clubShape from '@contexts/club-shape.json';
import formStyles from '@styles/form.style';
import getFieldValue from '@utils/getFieldValue';
import checkCanSave from '@utils/checkCanSave';
import getFieldControl from '@utils/getFieldControl';
import {
    FlexContainer,
    FlexItem,
    FlexItemRight
} from '@styles/layout.style';
import ClubTypeContext from '@utils/clubTypeContext';

const ClubForm = ({
    club,
    onSave,
    onCancel,
    onDelete,
    title ='Add club',
    actionLabel = 'add club'
}) => {

    const [clubState, setClubState] = useState(club);
    const clubTypeData = useContext(ClubTypeContext);

    const { t } = useTranslation();
    const classes = formStyles();

    const saveHandler = () => {

        onSave(clubState);
        setClubState(clubTypeData.clubType);
    };

    const onDeleteHandler = player => () => onDelete(player);

    const onChangeClubField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, [...args, clubTypeData.clubTypes]);

        setClubState(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };
    
    useEffect(() => {

        if(club) {
    
            setClubState(club);
    
        } else {
            
            if(clubTypeData.clubType) setClubState(clubTypeData.clubType);
        }

    }, [club, clubTypeData.clubType]);

    const clubFields = [];
    
    let index = 0;

    if(clubState) {
        
        clubShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: clubState[field.predicate],
                label: t('golf.selectClubType'),
                styles: classes,
                onChange: onChangeClubField,
                idx: index++
            });

            if(field !== 'ownedBy') clubFields.push(fieldControl);
        })
    }

    const canSave = checkCanSave(clubState, clubShape);
    const handleDelete = typeof(onDelete) === 'function' ? onDeleteHandler : undefined;

    return (
        <form noValidate autoComplete="off">
            <header className="c-header">{ title }</header>
            { clubFields }
            <FlexContainer>
                <FlexItem>
                    <Button
                        variant="contained"
                        disabled={ !canSave.can }
                        onClick={ saveHandler }
                        className={ classes.button }
                        color="primary">{ actionLabel }</Button>
                </FlexItem>
                {
                    handleDelete ? (
                        <FlexItem>
                            <Button
                                variant="contained"
                                disabled={ !canSave.can }
                                onClick={ handleDelete(club) }
                                className={ classes.button }
                                color="primary">Delete</Button>
                        </FlexItem>
                    ) : null
                }
                <FlexItemRight>
                { onCancel && <Button
                    variant="contained"
                    onClick={ onCancel }
                    className={ classes.button }
                    color="primary">Cancel</Button>
                }
                </FlexItemRight>
            </FlexContainer>
        </form>
    );
};

export default ClubForm;
