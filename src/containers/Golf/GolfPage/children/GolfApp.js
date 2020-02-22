import React, {
    lazy,
    useState,
    useEffect
} from 'react';

import { Route, Switch } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';

import NavigationShell from '@golf/components/NavigationShell';
import Alert from '@golf/components/Alert';
import SplashScreen from '@golf/GolfPage/children/splash/SplashScreen';
import { useMonitorData } from '@containers/Golf/contexts/dataProvider/AppDataProvider';

const Home = lazy(() => import('@golf/GolfPage/children/home/Home'));
const ManageBag = lazy(() => import('@golf/GolfPage/children/bag/ManageBag'));
const PlayGame = lazy(() => import('@golf/GolfPage/children/playGame/PlayGame'));
const ManageCourses = lazy(() => import('@golf/GolfPage/children/course/ManageCourses'));
const ManagePlayers = lazy(() => import('@golf/GolfPage/children/player/ManagePlayers'));
const ManageGames = lazy(() => import('@golf/GolfPage/children/game/ManageGames'));
const NewGame = lazy(() => import('@golf/GolfPage/children/newGame/NewGame'));

const GolfApp = ({ webId }) => {

    const [completed, setCompleted] = useState(0);
    const [snackOpen, setSnackOpen] = useState(false);
    const { progress, count, hasError } = useMonitorData();

    useEffect(() => {

        let didCancel = false;

        if(!didCancel) {

            if(hasError) setSnackOpen(true);

            setCompleted((100 / count) * progress);
        }

        return () => { didCancel = true; }

    }, [progress, count, completed]);

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
                    plopData did not load
                </Alert>
            </Snackbar>
            <Route render={ (props) => {

                return (
                    <Switch location={ props.location }>
                        <Route exact path="/golf"
                            render={ routerProps => <SplashScreen completed={ completed }
                                { ...routerProps }
                                webId={ webId }/> }/>
                        <Route
                            path="/golf/game/:gameid"
                            render={ routerProps => <PlayGame { ...routerProps } webId={ webId } /> }/>
                        <NavigationShell>
                            <Switch location={ props.location }>
                                <Route path="/golf/settings/" exact
                                    render={ routerProps => <Home 
                                        { ...routerProps }/> }/>
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
                                <Route path="/golf/settings/games/new" exact
                                    render={ (routerProps) => <NewGame
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
        </div>
    );
};

export default GolfApp;
