import React, { useState } from 'react';

import StrokeDetail from './StrokeDetail';

const getDistance = (lat1, lon1, lat2, lon2, unit) => {

    if ((lat1 === lat2) && (lon1 === lon2)) return 0;

    const radlat1 = Math.PI * lat1/180;
    const radlat2 = Math.PI * lat2/180;
    const theta = lon1-lon2;
    const radtheta = Math.PI * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") { dist = dist * 1.609344 }
    if (unit === "N") { dist = dist * 0.8684 }

        return dist;
};

const calculateStrokeDistanceInMeters = (stroke, hole) => {

    if(!hole) return 0;
    if(!stroke) return 0;

    const currStrokeIndex = hole.gameStrokes.value.indexOf(stroke); 
    const nextStrokeIndex = currStrokeIndex !== -1 && currStrokeIndex + 1 < hole.gameStrokes.value.length ? currStrokeIndex + 1 : -1;

    if(nextStrokeIndex !== -1) {
        
        const nextStroke = hole.gameStrokes.value[nextStrokeIndex];

        return Math.round(
            getDistance(
                stroke.strokeLocation.value.latitude.value,
                stroke.strokeLocation.value.longitude.value,
                nextStroke.strokeLocation.value.latitude.value,
                nextStroke.strokeLocation.value.longitude.value,
                'K'
            ) * 1000);

    } else {

        return 0;
    }
};

const HoleHistory = ({ hole, onSelect, onDeleteStroke }) => {

    const [selectedStroke, setSelectedStroke] = useState();

    const onSelectHandler = (stroke) => () => {

        onSelect && onSelect(stroke);
        setSelectedStroke(stroke);
    };

    const onDeleteStrokeHandler = (stroke) => {
        
        onDeleteStroke && onDeleteStroke(stroke, hole);
        setSelectedStroke();
    }

    const distance = calculateStrokeDistanceInMeters(selectedStroke, hole);

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
