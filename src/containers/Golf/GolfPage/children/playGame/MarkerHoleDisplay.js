import React, { useEffect, useState } from 'react';

import update from 'immutability-helper';

import getFieldControl from '@golfutils/getFieldControl';
import calculateHoleStablefordScore from '@golfutils/calculateHoleStablefordScore';
import getFieldValue from '@containers/Golf/utils/getFieldValue';

import formStyles from '@golfstyles/form.style';
import { FlexContainer, FlexItem } from '@golfstyles/layout.style';

const MarkerHoleDisplay = ({ hole, playingHandicap, onChange }) => {

    const [holeState, setHoleState] = useState();

    useEffect(() => {

        let isCanceled = false;

        if(!isCanceled) setHoleState(hole);

        return () => {
            isCanceled = true;
        }

    }, [hole]);

    const classes = formStyles();

    const onChangeHoleField = fieldDef => (...args)  => {
        
        const value = getFieldValue(fieldDef, args);

        setHoleState(state => {
            const changedState = update(state, {
                [fieldDef.predicate]: { value: { $set: value } }
            });

            onChange(value);
            return changedState;
        });
    };

    const displayFields = [];
    
    if(holeState) {

        const fieldData = holeState['gameMarkerStrokeCount'];

        displayFields.push(getFieldControl({
            data: fieldData,
            label: fieldData.label,
            styles: classes,
            onChange: onChangeHoleField,
            idx: 0
        }));
    }

    const si = holeState && holeState.holeStrokeIndex.value;
    const par = holeState && holeState.holePar.value;
    const score = holeState && holeState.gameMarkerStrokeCount.value;

    const playerStablefordScore = calculateHoleStablefordScore({
        handicap: playingHandicap && playingHandicap.markerPlayingHandicap.value,
        si,
        par,
        score
    });

    return (
        <FlexContainer>
            <FlexItem>
            { displayFields }
            </FlexItem>
            <FlexItem narrow className="marker-stableford-score">
                <div>
                { playerStablefordScore }
                </div>
            </FlexItem>
        </FlexContainer>
    );
};

export default MarkerHoleDisplay;
