import React from 'react';

import HoleDetail from '@golf/GolfPage/children/hole/HoleDetail';

const HoleList = ({
    holes,
    onSave,
    onDelete,
    listTitle
}) => {

    return (
        <>
            <header className="c-header--sec">{ listTitle }</header>
            {
                holes.length > 0 ? holes.map((hole, index) => <HoleDetail
                    key={ index }
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
