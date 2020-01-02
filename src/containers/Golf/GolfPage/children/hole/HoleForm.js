import React, { useState, useEffect, useRef } from 'react';

import holeShape from '@contexts/hole-shape.json';
import setupDataObject from '@utils/setupDataObject';
import golf from '@utils/golf-namespace';

import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';

import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import checkCanSave from '@utils/checkCanSave';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@styles/layout.style';

const HoleForm = ({
    hole: holeData,
    holeNumber,
    onSave,
    onEdit,
    onCancel,
    title = 'Add hole',
    actionLabel = 'add hole'
}) => {

    const [holeState, setHoleState] = useState();
    const focusRef = useRef();
    const classes = formStyles();
    const { t } = useTranslation();
    const holeFields = [];

    const saveHandler = () => {

        if(holeData) {
            onEdit(holeState);
        } else {
            onSave(holeState);
        }            
    };

    const getFieldValue = (fieldDef, args) => {

        const [data] = args;

        switch(fieldDef.fieldType) {
            case golf.types.string: return data.target.value;
            case golf.types.nonNegativeInteger: return data.target.value;
            default: return '';
        }
    };

    const onChangeHoleField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        const fields = {
            ...holeState.fields,
            [fieldDef.fieldName]: {
                ...holeState.fields[fieldDef.fieldName],
                field: {
                    ...holeState.fields[fieldDef.fieldName].field,
                    value
                }
            }
        };
        
        const data = {
            ...holeState,
            fields
        };

        setHoleState(data);
    };

    const getFieldControl = (field, index) => {
        
        switch(field.fieldType) {
    
            case golf.types.string : {

                const required = !field.field.required ? false : true;

                return <TextField
                    key={ index }
                    required={ required }
                    label={ field.field.label }
                    className={ classes.textField }
                    size="normal"
                    value={ field.field.value }
                    onChange={ onChangeHoleField(field) }
                    variant="outlined"/>
            }

            case golf.types.nonNegativeInteger : {

                if(field.fieldName === 'holeStrokeIndex') {

                    return <TextField
                        key={ index }
                        type="number"
                        required
                        label={ field.field.label }
                        className={ classes.textFieldNumber }
                        size="normal"
                        inputRef={ focusRef }
                        value={ field.field.value }
                        onChange={ onChangeHoleField(field) }
                        variant="outlined"/>
                }
                
                return <TextField key={ index }
                    type="number"
                    required
                    label={ field.field.label }
                    className={ classes.textFieldNumber }
                    size="normal"
                    value={ field.field.value }
                    onChange={ onChangeHoleField(field) }
                    variant="outlined"/>
            }

            default: {
            
                return <div key={ index }>no field component defined</div>;
            }
        }
    }

    useEffect(() => {

        holeData ? setHoleState(holeData) : setHoleState(setupDataObject(holeShape, {
            holeNumber
        }));

        if(focusRef && focusRef.current) {

            const { current } = focusRef;
            current.focus();
            current.select();
        }

    }, [holeData, holeNumber, focusRef.current]);


    if(holeState) {

        let index = 0;

        for (const field in holeState.fields) {

            const fieldControl = getFieldControl(holeState.fields[field], index++);
            holeFields.push(fieldControl);
        }
    }
    
    const canSave = checkCanSave(holeState);

    return <div>
        <header className="c-header">{ title }</header>
        { holeFields }
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
                    color="primary">{ t('golf.cancel') }</Button>
                }
                </FlexItemRight>
            </FlexContainer>
    </div>;
};

export default HoleForm;
