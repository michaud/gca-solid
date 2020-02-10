import { createContext } from 'react';

export const ClubTypeContext = /*#__PURE__*/ createContext({clubTypes: [], clubType: undefined});

if (process.env.NODE_ENV !== 'production') {
    ClubTypeContext.displayName = 'ClubTypeContext'
}

export default ClubTypeContext
