import React, { lazy, useState, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import NavigationShell from './NavigationShell';
import SplashScreen from './SplashScreen';
import useDataStructure from '@hooks/useDataStructure';
import { Snackbar } from '@material-ui/core';
import Alert from '@containers/Golf/components/Alert';

const ManageBag = lazy(() => import('@containers/Golf/GolfPage/children/bag/ManageBag'));
const ManageCourses = lazy(() => import('@containers/Golf/GolfPage/children/course/ManageCourses'));
const ManagePlayers = lazy(() => import('@containers/Golf/GolfPage/children/player/ManagePlayers'));
const ManageGames = lazy(() => import('@containers/Golf/GolfPage/children/game/ManageGames'));
const Home = lazy(() => import('@containers/Golf/GolfPage/children/home/Home'));

const GolfApp = ({ webId }) => {

    const [reload] = useState(false);
    const [completed, setCompleted] = useState(0);
    const [snackOpen, setSnackOpen] = useState(false);

    const dataStructure = useDataStructure(reload, true);

    useEffect(() => {

        let didCancel = false;

        if(!didCancel) {

            if(dataStructure.hasError) setSnackOpen(true);

            const { progress, count } = dataStructure;
            setCompleted((100 / count) * progress);
        }

        return () => { didCancel = true; }

    }, [dataStructure.progress, dataStructure.count, completed, setCompleted]);

    const handleSnackClose = (event, reason) => {
        
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
    };

    return <div id="app-container">
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                    Data did not load
                </Alert>
            </Snackbar>
        <Route render={ (props) => {

            return (
                <Switch location={ props.location }>
                    <Route exact path="/golf"
                        render={ routerProps => <SplashScreen completed={ completed }
                            { ...routerProps }
                            webId={ webId }/> }/>
                    <NavigationShell>
                        <Switch location={ props.location }>
                            <Route path="/golf/settings/" exact
                                render={ routerProps => <Home 
                                    { ...routerProps }
                                    { ...dataStructure } /> }/>
                                    
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
                    </NavigationShell>
                </Switch>
            )
        }} />
    </div>;
};

export default GolfApp;
