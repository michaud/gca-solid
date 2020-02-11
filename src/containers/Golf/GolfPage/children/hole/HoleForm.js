import React, { useState, useEffect, useRef } from 'react';

import update from 'immutability-helper';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import holeShape from '@golfcontexts/hole-shape.json';
import setupDataObject from '@golfutils/setupDataObject';
import checkCanSave from '@golfutils/checkCanSave';
import getFieldValue from '@golfutils/getFieldValue';
import getFieldControl from '@golfutils/getFieldControl';

import formStyles from '@golfstyles/form.style';
import {
    FlexContainer,
    FlexItem,
    FlexItemRight,
} from '@golfstyles/layout.style';

const HoleForm = ({
    hole: holeData,
    holeNumber,
    onSave,
    onEdit,
    onCancel,
    title = 'Add hole',
    actionLabel = 'add hole',
    availableStrokeIndices
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

        setHoleState(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };

    if(holeState) {

        let index = 0;

        holeShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: holeState[field.predicate],
                styles: classes,
                onChange: onChangeHoleField,
                inputRef: focusRef,
                availableStrokeIndices,
                idx: index++
            });

            holeFields.push(fieldControl);
        });
    }

    useEffect(() => {

        holeData ? setHoleState(holeData) : setHoleState(setupDataObject(holeShape, {
            holeNumber
        }));

    }, [holeData, holeNumber]);

    const canSave = checkCanSave(holeState, holeShape);

    return (
        <div className="c-box">
            <header className="c-header">{ title }</header>
            { holeFields }
            <FlexContainer>
                <FlexItem>
                    <Button
                        variant="contained"
                        disabled={ !canSave.can }
                        onClick={ saveHandler }
                        className={ classes.button }
                        color="primary">{ actionLabel }</Button>
                </FlexItem>
                <FlexItemRight>
                { onCancel && <Button
                    variant="contained"
                    disabled={ !canSave.can }
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
