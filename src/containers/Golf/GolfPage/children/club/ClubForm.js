import React, { useState, useEffect } from 'react';

import update from 'immutability-helper';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

import { useClubData } from '@golfcontexts/dataProvider/AppDataProvider';

import clubShape from '@golfcontexts/club-shape.json';
import getFieldValue from '@golfutils/getFieldValue';
import checkCanSave from '@golfutils/checkCanSave';
import getFieldControl from '@golfutils/getFieldControl';
import formStyles from '@golfstyles/form.style';
import {
    FlexContainer,
    FlexItem,
    FlexItemRight
} from '@golfstyles/layout.style';

const ClubForm = ({
    club,
    onSave,
    onCancel,
    onDelete,
    title ='Add club',
    actionLabel = 'add club'
}) => {

    const [clubState, setClubState] = useState(club);

    const { clubDefinitions } = useClubData();
    
    const { t } = useTranslation();
    const classes = formStyles();

    const saveHandler = () => {

        onSave(clubState);
        setClubState(clubDefinitions.clubType);
    };

    const onDeleteHandler = player => () => onDelete(player);

    const onChangeClubField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, [...args, clubDefinitions.clubTypes]);

        setClubState(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };
    
    useEffect(() => {

        if(club) {
    
            setClubState(club);
    
        } else {
            
            if(clubDefinitions.clubType) setClubState(clubDefinitions.clubType);
        }

    }, [club, clubDefinitions]);

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
