import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';
import useClubDefinitions from '@hooks/useClubDefinitions';

import ClubTypeContext from '@utils/clubTypeContext';
import AddClubs from './children/AddClubs';


const GolfPage = ({ match, webId, history }) => {

    const clubTypeDefinitions = useClubDefinitions();

    return (<StylesProvider>
            <ClubTypeContext.Provider value={ clubTypeDefinitions }>
                <Route>
                    <Switch>
                        <Route exact path="/golf" component={ AddClubs } />
                        {/* <Route path="/settings" component={ AppContainer } /> */}
                        {/* <Route path="/game/:gameid" component={ GameNavigatorContainer } /> */}
                    </Switch>
                </Route>
            </ClubTypeContext.Provider>
        </StylesProvider>
    );
};

export default GolfPage;
