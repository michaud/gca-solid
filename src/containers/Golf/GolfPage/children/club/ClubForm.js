import React, { useState, useEffect } from 'react';

import { withClubTypeContext } from '@utils/clubTypeContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import ClubTypeSelector from '@containers/Golf/GolfPage/children/club/ClubTypeSelector';
import golf from '@utils/golf-namespace';
import IDEditor from '@containers/Golf/GolfPage/children/IDEditor';

import { useTranslation } from 'react-i18next';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight
} from '@styles/layout.style';
import getFieldValue from '@utils/getFieldValue';

const checkCanSave = state => {
    
    return state && Object.entries(state.fields).every(entry => {
        
        return entry[1].field.value !== '';
    });
}

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
        console.log('value: ', value);

        const fields = {
            ...clubState.fields,
            [fieldDef.fieldName]: {
                ...clubState.fields[fieldDef.fieldName],
                field: {
                    ...clubState.fields[fieldDef.fieldName].field,
                    value
                }
            }
        };
        
        const data = {
            ...clubState,
            fields
        };

        setClubState(data);
    };

    const getFieldControl = (field, index) => {

        switch(field.fieldType) {
    
            case golf.classes.Player : {

                return <IDEditor
                    field={ field }
                    key={ index }
                    label={ field.field.label }
                    value={ field.field.value }
                    onChange={ onChangeClubField(field) }
                    variant="outlined"/>
            }

            case golf.types.string : {

                return <TextField key={ index }
                    required
                    label={ field.field.label }
                    className={ classes.textField }
                    size="normal"
                    margin="normal"
                    value={ field.field.value }
                    onChange={ onChangeClubField(field) }
                    variant="outlined"/>

            }

            case golf.classes.Club: {

                return <ClubTypeSelector
                    key={ index }
                    value={ field.field.value }
                    label={ t('golf.selectClubType') }
                    onChange={ onChangeClubField(field) }/>
            }
    
            default: {
            
                return <div key={ index }>no field component defined</div>;
            }
        }
    }
    
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

            const fieldControl = getFieldControl(clubState.fields[field], index++);
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
                    disabled={ !canSave }
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
