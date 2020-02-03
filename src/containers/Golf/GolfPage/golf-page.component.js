import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';

import GolfApp from '@containers/Golf/GolfPage/children/GolfApp';
import PlayGame from '@containers/Golf/GolfPage/children/playGame/PlayGame';
import ClubTypeContext from '@utils/clubTypeContext';
import useClubDefinitions from '@hooks/useClubDefinitions';

const GolfPage = (props) => {
    
    const { webId } = props;

    const clubTypeDefinitions = useClubDefinitions();
    const clubTypeDefs = clubTypeDefinitions || { clubTypes: [], clubType: null };

    return (<StylesProvider>
            <ClubTypeContext.Provider value={ clubTypeDefs }>
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
