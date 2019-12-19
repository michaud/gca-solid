import React, { useState, useEffect } from 'react';

import holeShape from '@contexts/hole-shape.json';
import setupDataObject from '@utils/setupDataObject';
import golf from '@utils/golf-namespace';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import formStyles from './form.style';

import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import checkCanSave from '@utils/checkCanSave';

const FlexContainer = styled.div`display: flex;`;

const FlexItem = styled.div`flex: 1;`;

const FlexItemRight = styled.div`
    flex: 1;
    text-align: right;
`;

const HoleForm = ({ hole: holeData, onSave, onCancel, title = 'Add hole', actionLabel = 'add hole' }) => {

    const [holeState, setHoleState] = useState();
    const classes = formStyles();
    const { t } = useTranslation();

    const saveHandler = () => {

        onSave(holeState);
        setHoleState(setupDataObject(holeShape));
    };

    const getFieldValue = (fieldDef, args) => {

        const [data] = args;

        switch(fieldDef.fieldType) {

            case golf.types.string: {
                
                return data.target.value;
            }

            case golf.types.nonNegativeInteger: {
                
                return data.target.value;
            }

            default: {
                return '';
            }
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

                return <TextField key={ index }
                    required
                    label={ field.field.label }
                    className={ classes.textField }
                    size="normal"
                    value={ field.field.value }
                    onChange={ onChangeHoleField(field) }/>
            }

            case golf.types.nonNegativeInteger : {

                return <TextField key={ index }
                    type="number"
                    required
                    label={ field.field.label }
                    className={ classes.textFieldNumber }
                    size="normal"
                    value={ field.field.value }
                    onChange={ onChangeHoleField(field) }/>
            }

            default: {
            
                return <div key={ index }>no field component defined</div>;
            }
        }
    }

    useEffect(() => {

        holeData ? setHoleState(holeData) : setHoleState(setupDataObject(holeShape));

    }, [holeData]);

    const holeFields = [];
    
    let index = 0;

    if(holeState) {
        
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
                    color="primary">Cancel</Button>
                }
                </FlexItemRight>
            </FlexContainer>
    </div>;
};

export default HoleForm;
