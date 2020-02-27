import React from 'react';

const HoleHistory = ({ hole }) => {

    return (
        <div className="hole-history">
            { hole && hole.gameStrokes && hole.gameStrokes.value.map(stroke => {

                return <span key={ stroke.iri } className="stroke-history__tab">{
                        stroke.strokeClub.value.clubType.value.label
                    }
                    </span>;
                })
            }
        </div>
    );
};

export default HoleHistory;
