import React, { useState } from 'react';

import calculateStrokeDistance from '@golfutils/calculateStrokeDistance';

import StrokeDetail from '@golfpagectrl/playGame/StrokeDetail';

const HoleHistory = ({ hole, onSelect, onDeleteStroke }) => {

    const [selectedStroke, setSelectedStroke] = useState();

    const onSelectHandler = (stroke) => () => {

        onSelect && onSelect(stroke);
        if(selectedStroke && selectedStroke.iri === stroke.iri) {
            setSelectedStroke();
        } else {
            setSelectedStroke(stroke);
        }
        
    };

    const onDeleteStrokeHandler = (stroke) => {
        
        onDeleteStroke && onDeleteStroke(stroke, hole);
        setSelectedStroke();
    }

    const distance = calculateStrokeDistance(selectedStroke, hole);

    return (
        <>
            <div className="hole-history">
            { hole && hole.gameStrokes && hole.gameStrokes.value.map(stroke => {

                return <button key={ stroke.iri } onClick={ onSelectHandler(stroke)  } className={ `stroke-history__pill${ selectedStroke && selectedStroke.iri === stroke.iri ? ' selected' : '' }` }>
                    <div className="pill__container">{
                        stroke.strokeClub.value.clubType.value.label
                    }</div>
                    </button>;
                })
            }
            </div>
            { selectedStroke && <StrokeDetail distance={ distance } stroke={ selectedStroke } onDelete={ onDeleteStrokeHandler }/> }
        </>
    );
};

export default HoleHistory;
