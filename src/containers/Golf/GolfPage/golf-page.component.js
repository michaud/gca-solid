import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';
import useClubDefinitions from '@hooks/useClubDefinitions';

import ClubTypeContext from '@utils/clubTypeContext';
import ManageBag from '@containers/Golf/GolfPage/children/bag/ManageBag';
import GolfApp from '@containers/Golf/GolfPage/children/GolfApp';
import PlayGame from '@containers/Golf/GolfPage/children/playGame/PlayGame';


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

                        <Route exact path="/golf/settings" render={routerProps => <ManageBag { ...routerProps } webId={ webId } />} />
                        <Route path="/game/:gameid" render={ routerProps => <PlayGame { ...routerProps } webId={ webId } /> }/>
                        {/* <Route path="/settings" component={ AppContainer } /> */}
                        {/* <Route path="/game/:gameid" component={ GameNavigatorContainer } /> */}
                    </Switch>
                </Route>
            </ClubTypeContext.Provider>
        </StylesProvider>
    );
};

export default GolfPage;
