import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';
import useClubDefinitions from '@hooks/useClubDefinitions';

import ClubTypeContext from '@utils/clubTypeContext';
import ManageBag from './children/ManageBag';
import GolfApp from './children/GolfApp';


const GolfPage = ({ match, webId, history }) => {
    
    const clubTypeDefinitions = useClubDefinitions();
    const clubTypeDefs = clubTypeDefinitions || { clubTypes: [], clubType: null };

    return (<StylesProvider>
            <ClubTypeContext.Provider value={ clubTypeDefs }>
                <Route>
                    <Switch>
                        <Route
                            path="/golf"
                            webId={ webId }
                            render={routerProps => <GolfApp { ...routerProps } webId={ webId } />}/>
                        {/* <Route
                            exact path="/golf"
                            webId={ webId }
                            render={routerProps => <AddClubs {...routerProps} webId={webId} />}/> */}

                        <Route exact path="/golf/settings" render={routerProps => <ManageBag {...routerProps} webId={webId} />} />
                        <Route path="/golf/game/:gameid" render={routerProps => <ManageBag {...routerProps} webId={webId} />} />
                        {/* <Route path="/settings" component={ AppContainer } /> */}
                        {/* <Route path="/game/:gameid" component={ GameNavigatorContainer } /> */}
                    </Switch>
                </Route>
            </ClubTypeContext.Provider>
        </StylesProvider>
    );
};

export default GolfPage;
