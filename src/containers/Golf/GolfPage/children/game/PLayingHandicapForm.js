import React, {
    useState,
    useEffect
} from 'react';

import update from 'immutability-helper';

import getFieldControl from '@golfutils/getFieldControl';
import playingHandicapShape from '@golfcontexts/playing-handicap-shape.json';
import getFieldValue from '@golfutils/getFieldValue';
import formStyles from '@golfstyles/form.style';

const PLayingHandicapForm = ({
    handicap,
    onChange
}) => {

    const [handicapState, setHandicapState] = useState();
    const classes = formStyles();

    const handicapFields = [];
    
    let index = 0;

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

    useEffect(() => {

        if (handicap) setHandicapState(handicap);

    }, [handicap]);

    if(handicapState) {
        
        playingHandicapShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: handicapState[field.predicate],
                styles: classes,
                onChange: onChangeField,
                idx: `${ field.predicate }${ index++ }`
            });

            handicapFields.push(fieldControl);
        });
    };

    return (
        <div className="c-box">
            <header className="c-header push">Playing handicap</header>
            { handicapFields }
        </div>
    );
};

export default PLayingHandicapForm;
