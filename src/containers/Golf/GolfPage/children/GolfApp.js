import React, {
    lazy,
    useState,
    useEffect
} from 'react';

import { Route, Switch } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';

import { useMonitorData } from '@golfcontexts/dataProvider/AppDataProvider';

import NavigationShell from '@golf/components/NavigationShell';
import Alert from '@golf/components/Alert';
import SplashScreenLoading from '@golfpagectrl/splash/SplashScreenLoading';

const Home = lazy(() => import('@golfpagectrl/home/Home'));
const ManageBag = lazy(() => import('@golfpagectrl/bag/ManageBag'));
const PlayGame = lazy(() => import('@golfpagectrl/playGame/PlayGame'));
const ManageCourses = lazy(() => import('@golfpagectrl/course/ManageCourses'));
const ManagePlayers = lazy(() => import('@golfpagectrl/player/ManagePlayers'));
const ManageGames = lazy(() => import('@golfpagectrl/game/ManageGames'));
const NewGame = lazy(() => import('@golfpagectrl/newGame/NewGame'));

const GolfApp = () => {

    const [completed, setCompleted] = useState(0);
    const [snackOpen, setSnackOpen] = useState(false);
    const { progress, count, hasError, errors } = useMonitorData();
    
    useEffect(() => {
        
        let didCancel = false;
        
        if(!didCancel) {

            if(hasError) {

                setSnackOpen(true);
            }

            setCompleted((100 / count) * progress);
        }

        return () => { didCancel = true; }

    }, [progress, count, completed, hasError]);

    const handleSnackClose = (event, reason) => {
        
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackOpen(false);
    };

    return (
        <div id="app-container">
            <Snackbar
                open={ snackOpen }
                autoHideDuration={ 4000 }
                onClose={ handleSnackClose }
                anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}>
                <Alert onClose={ handleSnackClose } severity="error">
                {
                    errors.map((err, idx) => <div key={ idx }>{ err ? err.message : '' }</div>)
                }
                </Alert>
            </Snackbar>
            <Route render={ (props) => {

                return (
                    <Switch location={ props.location }>
                        <Route exact path="/golf"
                            render={ routerProps => <SplashScreenLoading completed={ completed }
                                { ...routerProps }/> }/>
                        <Route
                            path="/golf/game/:gameid"
                            render={ routerProps => <PlayGame
                                { ...routerProps }/> }/>
                        <NavigationShell>
                            <Switch location={ props.location }>
                                <Route path="/golf/settings/" exact
                                    render={ routerProps => <Home 
                                        { ...routerProps }/> }/>
                                <Route path="/golf/settings/bag"
                                    render={ routerProps => <ManageBag
                                        { ...routerProps }/> }/>
                                <Route path="/golf/settings/courses"
                                    render={ (routerProps) => <ManageCourses
                                        { ...routerProps }/> }/>
                                <Route path="/golf/settings/players"
                                    render={ (routerProps) => <ManagePlayers
                                        { ...routerProps }/> }/>
                                <Route path="/golf/settings/games/new" exact
                                    render={ (routerProps) => <NewGame
                                        { ...routerProps }/> }/>
                                <Route path="/golf/settings/games"
                                    render={ (routerProps) => <ManageGames
                                        { ...routerProps }/> }/>
                            </Switch>
                        </NavigationShell>
                    </Switch>
                )
            }} />
        </div>
    );
};

export default GolfApp;
