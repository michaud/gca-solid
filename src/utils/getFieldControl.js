import React from 'react';
import { IDEditor, ManageHoles } from "@containers/Golf/GolfPage/children";
import golf from "./golf-namespace";
import { TextField } from '@material-ui/core';
import ClubTypeSelector from '@containers/Golf/GolfPage/children/club/ClubTypeSelector';

const getFieldControl = ({
    field,
    label,
    styles,
    onChange,
    onSave,
    onSaveEdit,
    inputRef,
    idx
}) => {

    const required = field.hasOwnProperty('required') ? field.required : true;

    switch(field.fieldType) {

        case golf.types.string : {

            return <TextField key={ idx }
                required={ required }
                label={ field.field.label }
                className={ styles.textField }
                size="normal"
                value={ field.field.value }
                onChange={ onChange(field) }
                variant="outlined"/>
        }

        case golf.types.text : {

            return <TextField key={ idx }
                required={ required }
                label={ field.field.label }
                className={ styles.textField }
                size="normal"
                value={ field.field.value }
                onChange={ onChange(field) }
                variant="outlined"/>
        }

        case golf.types.integer : {
            
            return <TextField key={ idx }
                required
                type="number"
                label={ field.field.label }
                className={ styles.textField }
                size="normal"
                value={ field.field.value }
                onChange={ onChange(field) }
                variant="outlined"/>
        }

        case golf.types.nonNegativeInteger : {

            if(field.fieldName === 'holeStrokeIndex') {

                return <TextField
                    key={ idx }
                    type="number"
                    required
                    label={ field.field.label }
                    className={ styles.textFieldNumber }
                    size="normal"
                    inputRef={ inputRef }
                    value={ field.field.value }
                    onChange={ onChange(field) }
                    variant="outlined"/>
            }

            return <TextField key={ idx }
                required={ required }
                type="number"
                label={ field.field.label }
                className={ styles.textFieldNumber }
                size="normal"
                value={ field.field.value }
                onChange={ onChange(field) }
                variant="outlined"/>
        }

        case golf.classes.Player : {

            return <IDEditor
                field={ field }
                key={ idx }
                label={ field.field.label }
                value={ field.field.value }
                onChange={ onChange(field) }
                variant="outlined"/>
        }

        case golf.classes.Club: {

            return <ClubTypeSelector
                key={ idx }
                value={ field.field.value }
                label={ label }
                onChange={ onChange(field) }/>
        }

        case golf.classes.Hole : {

            return <ManageHoles
                onSave={ onSave }
                onSaveEdit={ onSaveEdit }
                key={ idx }
                holes={ field.field.value }/>
        }

        default: {
        
            return <div key={ idx }>no field component defined</div>;
        }
    }
};

export default getFieldControl;
