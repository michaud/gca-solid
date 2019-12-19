import React, { createContext } from 'react';

export const ClubTypeContext = /*#__PURE__*/ createContext(null);

if (process.env.NODE_ENV !== 'production') {
    ClubTypeContext.displayName = 'ReactRedux'
}

export const withClubTypeContext = Component => props => {

    return <ClubTypeContext.Consumer>
    {
        clubTypeData => {

            const clubTypes = clubTypeData ? clubTypeData.clubTypes : [];
            const clubType = clubTypeData ? clubTypeData.clubType : undefined;
            return <Component { ...props } clubTypes={ clubTypes } clubType={ clubType }/>;
        }
    }
    </ClubTypeContext.Consumer>;
};

export default ClubTypeContext
