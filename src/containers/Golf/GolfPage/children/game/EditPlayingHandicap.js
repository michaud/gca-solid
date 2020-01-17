import React, { useState } from 'react';
import getFieldControl from '@utils/getFieldControl';
import formStyles from '@styles/form.style';
import getFieldValue from '@utils/getFieldValue';

const EditPlayingHandicap = ({ handicap, onChange = () => {} }) => {

    const [handicapState, setHandicapState] = useState(handicap);
    const classes = formStyles();

    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        const data = {
            ...handicapState,
            [fieldDef.fieldName]: {
                ...handicapState[fieldDef.fieldName],
                value
            }
        };
        
        setHandicapState(data);
        onChange(data);
    };

    const handicapFields = [];
    
    let index = 0;

    if(handicapState) {
        
        for (const field in handicapState.fields) {

            const fieldControl = getFieldControl({
                data: handicapState.fields[field],
                styles: classes,
                onChange: onChangeField,
                idx: index++
            });

            handicapFields.push(fieldControl);
        }
    };

    return (
        <>
        <header className="c-header--sec">Playing handicap</header>
        { handicapFields }
        </>
    );
};

export default EditPlayingHandicap;
