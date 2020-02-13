import React from 'react';

import { Route } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';

import ClubTypeContext from '@golfutils/clubTypeContext';
import useClubDefinitions from '@golfhooks/useClubDefinitions';

import GolfApp from '@golf/GolfPage/children/GolfApp';

import './../scss/_style.scss';

const GolfPage = (props) => {
    
    const { webId } = props;

    const clubTypeDefinitions = useClubDefinitions();

    return (<StylesProvider>
            <ClubTypeContext.Provider value={ clubTypeDefinitions }>
                <Route
                    path="/golf"
                    render={routerProps => <GolfApp { ...routerProps } webId={ webId } />}/>
            </ClubTypeContext.Provider>
        </StylesProvider>
    );
};

export default GolfPage;
