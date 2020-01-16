import React from 'react';

const HoleHistory = ({ hole }) => {
    return (
        <div className="hole-history">
            { hole && hole.fields.gameStrokes.field.value.map((stroke, idx) => {

                return <span key={ idx } className="stroke-history__tab">{
                        stroke.fields.strokeClub.field.value.fields.clubType.field.value.label
                    }
                     {/* {
                        stroke.fields.strokeLocation.field.value.longitude
                    } */}
                    </span>;
                })
            }
        </div>
    );
};

export default HoleHistory;
