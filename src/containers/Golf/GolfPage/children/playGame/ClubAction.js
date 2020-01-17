import React from 'react';

const ClubAction = ({ club, classString, onStrokeWithClub }) => {
    return (
        <li className={ classString } >
            <button className="btn--club" onClick={ onStrokeWithClub(club) }>
                <div className="btn--club__name">{ club.fields.clubBrand.field.value } { club.fields.clubName.field.value }</div>
                <div className="btn--club__type">{ club.fields.clubType.field.value.label }</div>
            </button>
        </li>
    );
};

export default ClubAction;
