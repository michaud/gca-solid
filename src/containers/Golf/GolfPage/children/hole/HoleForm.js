import React, { useState, useEffect, useRef } from 'react';

import holeShape from '@contexts/hole-shape.json';
import setupDataObject from '@utils/setupDataObject';
import Button from '@material-ui/core/Button';
import formStyles from '@styles/form.style';
import { useTranslation } from 'react-i18next';
import checkCanSave from '@utils/checkCanSave';
import getFieldValue from '@utils/getFieldValue';
import getFieldControl from '@utils/getFieldControl';
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

    const onChangeHoleField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        const data = {
            ...holeState,
            [fieldDef.fieldName]: {
                ...holeState[fieldDef.fieldName],
                value
            }
        };

        setHoleState(data);
    };

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

        holeShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: holeState[field.predicate],
                styles: classes,
                onChange: onChangeHoleField,
                inputRef: focusRef,
                idx: index++
            });
            holeFields.push(fieldControl);
        });
    }
    
    const canSave = checkCanSave(holeState, holeShape);

    return (
        <div>
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
        </div>
    );
};

export default HoleForm;
