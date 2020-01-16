import React from 'react';
import golf from '@utils/golf-namespace';

const ClubActions = ({ clubs, onAction }) => {

    const onStrokeWithClub = club => () => {
        onAction && onAction(club);
    };

    const getClassNameFromClubType = (club) => {

        switch(club.fields.clubType.field.value.iri) {
    
            case golf.classes.Driver : 
            case golf.classes.Putter : {
    
                return 'l-club-span-3';
            }
    
            default : {
      
                return 'l-club-span-1';
            }
        }
    };
    
    return (
        <ol className="plain-list play-bag-club-list">
        {
            clubs && clubs.map((club, idx) => {

                const classString = getClassNameFromClubType(club);

                return <li className={ classString } key={ idx }>
                        <button className="btn--club" onClick={ onStrokeWithClub(club) }>
                            <div className="btn--club__name">{ club.fields.clubBrand.field.value } { club.fields.clubName.field.value }</div>
                            <div className="btn--club__type">{ club.fields.clubType.field.value.label }</div>
                        </button>
                    </li>;
            })
        }
        </ol>
    );
};

export default ClubActions;
