import React from 'react';

import ClubDetail from '@containers/Golf/GolfPage/children/club/ClubDetail';

const ClubList = ({
    clubs = [],
    onSave,
    onDelete
}) => {

    return (
        <div>
            <header className="c-header">Club List</header>
            {
                clubs.length > 0 && clubs.map((club, index) => <ClubDetail
                    onSave={ onSave }
                    onDelete={ onDelete }
                    key={ index }
                    club={ club } />)
            }
        </div>
    );
};

export default ClubList;
