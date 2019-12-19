import React from 'react';

import { Route, Switch } from 'react-router-dom';
import NavigationShell from './NavigationShell';
import ManageBag from './ManageBag';
import SplashScreen from './SplashScreen';
import ManageCourses from './ManageCourses';

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
                                webId={ webId }/> } />
                        <Route path="/golf/settings/bag"
                            render={ routerProps => <ManageBag
                                { ...routerProps }
                                webId={ webId } /> } />
                        <Route path="/golf/settings/courses" render={ (routerProps) => <ManageCourses
                                { ...routerProps }
                                webId={ webId }/> }/>
                        {/* <Route path="/golf/settings/game/new" render={ () => <NewGameContainer/> }/>
                            <Route path="/golf/settings/players" render={ () => <PlayersComponent/> }/>

                            <Route path="/golf/settings/games" render={ () => <GameListContainer/> }/> */}
                    </Switch>
                )
            }} />
        </NavigationShell>
    </div>;
};

export default GolfApp;
