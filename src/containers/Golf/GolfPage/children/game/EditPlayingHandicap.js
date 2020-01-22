import React, { useState } from 'react';

import update from 'immutability-helper';
import getFieldControl from '@utils/getFieldControl';
import formStyles from '@styles/form.style';
import getFieldValue from '@utils/getFieldValue';
import handicapShape from '@contexts/playing-handicap-shape.json';

const EditPlayingHandicap = ({ handicap, onChange = () => {} }) => {
    console.log('handicap: ', handicap);

    const [handicapState, setHandicapState] = useState(handicap);
    const classes = formStyles();

    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, args);

        setHandicapState(oldState => {

            const state = update(oldState, {
                [fieldDef.predicate]: { value: { $set: value } }
            });

            onChange(state);

            return state
        });
    };

    const handicapFields = [];
    
    let index = 0;

    if(handicapState) {
        
        handicapShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: handicapState[field.predicate],
                styles: classes,
                onChange: onChangeField,
                idx: index++
            });

            handicapFields.push(fieldControl);
        });
    };

    return (
        <div className="c-box">
            <header className="c-header--sec">Playing handicap</header>
            { handicapFields }
        </div>
    );
};

export default EditPlayingHandicap;
