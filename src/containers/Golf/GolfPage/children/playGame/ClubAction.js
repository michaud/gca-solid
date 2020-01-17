import React from 'react';

const ClubAction = ({ club, classString, onStrokeWithClub }) => {
    return (
        <li className={ classString } >
            <button className="btn--club" onClick={ onStrokeWithClub(club) }>
                <div className="btn--club__name">{ club.clubBrand.value } { club.clubName.value }</div>
                <div className="btn--club__type">{ club.clubType.value.label }</div>
            </button>
        </li>
    );
};

export default ClubAction;
