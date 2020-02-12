import React from 'react';

import './../scss/_style.scss';

import { Switch, Route } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';

import ClubTypeContext from '@golfutils/clubTypeContext';
import useClubDefinitions from '@golfhooks/useClubDefinitions';

import GolfApp from '@golf/GolfPage/children/GolfApp';
import PlayGame from '@golf/GolfPage/children/playGame/PlayGame';

const GolfPage = (props) => {
    
    const { webId } = props;

    const clubTypeDefinitions = useClubDefinitions();

    return (<StylesProvider>
            <ClubTypeContext.Provider value={ clubTypeDefinitions }>
                <Route>
                    <Switch>
                        <Route path="/golf/game/:gameid" render={ routerProps => <PlayGame { ...routerProps } webId={ webId } /> }/>
                        <Route
                            path="/golf"
                            webId={ webId }
                            render={routerProps => <GolfApp { ...routerProps } webId={ webId } />}/>
                    </Switch>
                </Route>
            </ClubTypeContext.Provider>
        </StylesProvider>
    );
};

export default GolfPage;
