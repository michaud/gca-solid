import React, { useState, useEffect } from 'react';

import { withClubTypeContext } from '@utils/clubTypeContext';
import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import { useTranslation } from 'react-i18next';
import getFieldValue from '@utils/getFieldValue';
import checkCanSave from '@utils/checkCanSave';
import getFieldControl from '@utils/getFieldControl';
import {
    FlexContainer,
    FlexItem,
    FlexItemRight
} from '@styles/layout.style';

const ClubForm = ({
    club,
    onSave,
    onCancel,
    clubTypes,
    clubType,
    title ='Add club',
    actionLabel = 'add club'
}) => {

    const [clubState, setClubState] = useState(club);
    const { t } = useTranslation();
    const classes = formStyles();

    const saveHandler = () => {

        onSave(clubState);
        setClubState(clubType);
    };

    const onChangeClubField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, [...args, clubTypes]);

        const fields = {
            ...clubState.fields,
            [fieldDef.fieldName]: {
                ...clubState.fields[fieldDef.fieldName],
                value
            }
        };
        
        const data = {
            ...clubState,
            fields
        };

        setClubState(data);
    };
    
    useEffect(() => {

        if(club) {
    
            setClubState(club);
    
        } else {
            
            if(clubType) setClubState(clubType);
        }

    }, [club, clubType]);

    const clubFields = [];
    
    let index = 0;

    if(clubState) {
        
        for (const field in clubState.fields) {

            const fieldControl = getFieldControl({
                data: clubState.fields[field],
                label: t('golf.selectClubType'),
                styles: classes,
                onChange: onChangeClubField,
                idx: index++
            });

            if(field !== 'ownedBy') clubFields.push(fieldControl);
        }
    }

    const canSave = checkCanSave(clubState);

    return (
        <form noValidate autoComplete="off">
            <header className="c-header">{ title }</header>
            { clubFields }
            <FlexContainer>
                <FlexItem>
                    <Button
                        variant="contained"
                        disabled={ !canSave }
                        onClick={ saveHandler }
                        className={ classes.button }
                        color="primary">{ actionLabel }</Button>
                </FlexItem>
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

export default withClubTypeContext(ClubForm);
