import React from 'react';

import ClubDetail from '@golf/GolfPage/children/club/ClubDetail';

const ClubList = ({
    clubs = [],
    onSave,
    onDelete
}) => {

    return (
        <div>
            <header className="c-header">Club List</header>
            {
                clubs.length > 0 && clubs.map(club => <ClubDetail
                    onSave={ onSave }
                    onDelete={ onDelete }
                    key={ club.iri }
                    club={ club } />)
            }
        </div>
    );
};

export default ClubList;
