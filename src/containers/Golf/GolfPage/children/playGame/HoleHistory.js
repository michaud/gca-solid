import React from 'react';

const HoleHistory = ({ hole }) => {
    return (
        <div className="hole-history">
            { hole && hole.fields.gameStrokes.value.map((stroke, idx) => {

                return <span key={ idx } className="stroke-history__tab">{
                        stroke.fields.strokeClub.value.fields.clubType.value.label
                    }
                     {/* {
                        stroke.fields.strokeLocation.value.longitude
                    } */}
                    </span>;
                })
            }
        </div>
    );
};

export default HoleHistory;
