import React, { lazy } from 'react';

import { Route, Switch } from 'react-router-dom';
import NavigationShell from './NavigationShell';
import SplashScreen from './SplashScreen';

const ManageBag = lazy(() => import('@containers/Golf/GolfPage/children/bag/ManageBag'));
const ManageCourses = lazy(() => import('@containers/Golf/GolfPage/children/course/ManageCourses'));
const ManagePlayers = lazy(() => import('@containers/Golf/GolfPage/children/player/ManagePlayers'));
const ManageGames = lazy(() => import('@containers/Golf/GolfPage/children/game/ManageGames'));
const Home = lazy(() => import('@containers/Golf/GolfPage/children/home/Home'));

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
                        <Route path="/golf/settings/" exact
                            render={ routerProps => <Home
                                { ...routerProps }
                                webId={ webId } /> }/>
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
                    </Switch>
                )
            }} />
        </NavigationShell>
    </div>;
};

export default GolfApp;
