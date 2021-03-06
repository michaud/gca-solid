import React from 'react';

import golf from '@golfconstants/golf-namespace';

import ClubAction from '@golfpagectrl/playGame/ClubAction';

const ClubActionList = ({ clubs, onAction }) => {

    const onStrokeWithClub = club => () => {

        onAction && onAction(club);
    };

    const getClassNameFromClubType = (club) => {

        switch(club.clubType.value.iri) {
    
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
            clubs && clubs.map(club => {

                const classString = getClassNameFromClubType(club);
                
                return <ClubAction key={ club.iri }
                    club={ club }
                    classString={ classString }
                    onStrokeWithClub={ onStrokeWithClub }/>
            })
        }
        </ol>
    );
};

export default ClubActionList;
