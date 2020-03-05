import React from 'react';

import HoleDetail from '@golfpagectrl/hole/HoleDetail';

const HoleList = ({
    holes,
    onSave,
    onDelete,
    listTitle
}) => {

    return (
        <>
            <header className="c-header nudge">{ listTitle }</header>
            {
                holes.length > 0 ? holes.map(hole => <HoleDetail
                    key={ hole.iri }
                    onSave={ onSave }
                    onDelete={ onDelete }
                    hole={ hole }/>
                ) :
                <div className="hole-list--item">Add a hole</div>
            }
        </>
    );
};

export default HoleList;
