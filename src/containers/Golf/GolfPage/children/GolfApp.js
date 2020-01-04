import React from 'react';

import { Route, Switch } from 'react-router-dom';
import NavigationShell from './NavigationShell';
import ManageBag from '@containers/Golf/GolfPage/children/bag/ManageBag';
import SplashScreen from './SplashScreen';
import ManageCourses from '@containers/Golf/GolfPage/children/course/ManageCourses';
import ManagePlayers from '@containers/Golf/GolfPage/children/player/ManagePlayers';
import ManageGames from './game/ManageGames';

// import EditBagComponent from 'components/bag/EditBagComponent';
// import AddCourseComponent from 'components/course/AddCourseComponent';
// import GameListContainer from 'components/game/GameListContainer';
// import PlayersComponent from 'components/player/PlayersComponent';
// import NewGameContainer from 'components/game/edit/NewGameContainer';

const GolfApp = ({ webId }) => {

    return <div id="app-container">
        <NavigationShell>
            <Route render={ (props) => {
                return (
                    <Switch location={ props.location }>
                        <Route exact path="/golf"
                            render={ routerProps => <SplashScreen
                                { ...routerProps }
                                webId={ webId }/> }/>
                        <Route path="/golf/settings/bag"
                            render={ routerProps => <ManageBag
                                { ...routerProps }
                                webId={ webId } /> }/>
                        <Route path="/golf/settings/courses"
                            render={ (routerProps) => <ManageCourses
                                { ...routerProps }
                                webId={ webId }/> }/>
                        <Route path="/golf/settings/players"
                            render={ (routerProps) => <ManagePlayers
                                { ...routerProps }
                                webId={ webId }/> }/>
                        <Route path="/golf/settings/games"
                            render={ (routerProps) => <ManageGames
                                { ...routerProps }
                                webId={ webId }/> }/>
                        {/* <Route path="/golf/settings/game/new" render={ () => <NewGameContainer/> }/> */}
                    </Switch>
                )
            }} />
        </NavigationShell>
    </div>;
};

export default GolfApp;
