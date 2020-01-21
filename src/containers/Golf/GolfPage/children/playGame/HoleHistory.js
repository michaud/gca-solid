import React from 'react';

const HoleHistory = ({ hole }) => {

    return (
        <div className="hole-history">
            { hole && hole.gameStrokes && hole.gameStrokes.value.map((stroke, idx) => {

                return <span key={ idx } className="stroke-history__tab">{
                        stroke.strokeClub.value.clubType.value.label
                    }
                     {/* {
                        stroke.strokeLocation.value.longitude
                    } */}
                    </span>;
                })
            }
        </div>
    );
};

export default HoleHistory;
