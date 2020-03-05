import React from 'react';

import { FlexContainer, FlexItem } from '@golfstyles/layout.style';

const ClubAction = ({ club, classString, onStrokeWithClub }) => {

    return (
        <li className={ classString } >
            <button className="btn--club" onClick={ onStrokeWithClub && onStrokeWithClub(club) }>
                <FlexContainer flex="1" alignitems="center">
                    <FlexItem>
                        <div className="btn--club__name">{ `${ club.clubBrand.value } ${ club.clubName.value }` }</div>
                        <div className="btn--club__type">{ club.clubType.value.label }</div>
                    </FlexItem>
                </FlexContainer>
            </button>
        </li>
    );
};

export default ClubAction;
