import React, {
    useEffect,
    useState
} from 'react';

import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import SportsGolfIcon from '@material-ui/icons/SportsGolf';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';

import golf from '@golfutils/golf-namespace';
import saveGameResourse from '@golfservices/saveGameResourse';
import { useGameListData } from '@golfcontexts/dataProvider/AppDataProvider';

import ModuleHeader from '@golf/components/ModuleHeader';
import GameList from '@golf/GolfPage/children/game/GameList';
import IntroPanel from '@golf/components/IntroPanel';

import {
    PageContainer,
    PageContent
} from '@golfstyles/page.style';
import {
    FlexContainer,
    FlexItem
} from '@golfstyles/layout.style';
import deleteGame from '@containers/Golf/utils/deleteGame';
import { Button } from '@containers/Profile/profile.style';

import { makeStyles } from '@material-ui/core/styles';

const dialogStyles = makeStyles(theme => ({
    root: {
        justifyContent: 'stretch',
        alignItems: 'stretch'
    },

    button: {
        maxWidth: '100%',
        flex: 1,
        color: 'white',
        '&:hover': {
            color: 'white',
            borderColor: 'darkgreen'
        },
        background: 'linear-gradient(171deg, rgb(85, 177, 0) 0%, rgb(55, 116, 0) 100%)',
        '& .MuiButton-label': {
            color: 'white'
        },
        '&.Mui-disabled.Mui-disabled': {
            background: 'linear-gradient(171deg, rgb(241, 234, 208) 0%, rgb(218, 208, 169) 100%)',
        },
        '&:disabled': {
            opacity: 1,
            '& .MuiButton-label': {
                color: 'rgba(0,0,0,.5)'
            }
        }
    },
    angryButton: {
        maxWidth: '100%',
        flex: 1,
        color: 'white',
        '&:hover': {
            color: 'white',
            borderColor: 'darkgreen',
            background: ' linear-gradient(45deg, rgba(111,195,34,0) 0%, rgba(106,190,30,0) 16%, rgba(105,189,29,1) 17%, rgba(99,183,24,1) 32%, rgba(99,183,24,0) 33%, rgba(94,177,19,0) 46%, rgba(93,176,18,1) 47%, rgba(89,171,14,1) 64%, rgba(88,170,13,0) 66%, rgba(82,163,8,0) 79%, rgba(81,162,7,1) 81%, rgba(73,153,0,1) 100%), linear-gradient(171deg, rgb(85, 177, 0) 0%, rgb(55, 116, 0) 100%)'
        },
        background: 'linear-gradient(171deg, rgb(85, 177, 0) 0%, rgb(55, 116, 0) 100%)',
        '& .MuiButton-label': {
            color: 'white'
        },
        '&.Mui-disabled.Mui-disabled': {
            background: 'linear-gradient(171deg, rgb(241, 234, 208) 0%, rgb(218, 208, 169) 100%)',
        },
        '&:disabled': {
            opacity: 1,
            '& .MuiButton-label': {
                color: 'rgba(0,0,0,.5)'
            }
        }
    }
}));


const ManageGames = () => {

    const [games, setGames] = useState([]);
    const [playGame, setPlayGame] = useState(false);
    const [deletedGame, setDeletedGame] = React.useState();
    const classes = dialogStyles();

    const {
        gameListData,
        gameListDataIsLoading,
        reloadGames
    } = useGameListData()

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if (!didCancel) setGames(gameListData.list);
        }

        init();

        return () => { didCancel = true }

    }, [gameListData]);

    const deleteGameConfirmCloseHandler = (confirm) => async () => { 

        if(confirm === true) {
            await deleteGame(deletedGame, gameListData);
            reloadGames();
        }

        setDeletedGame();
    };

    const onSaveGameHandler = game => {

        saveGameResourse({
            resource: game,
            list: gameListData.doc,
            type: golf.classes.Game
        });

        reloadGames();
    };

    const onDeleteGameHandler = async (game) => {

        setDeletedGame(game);
    };

    const onPlayGameHandler = game => setPlayGame(game.split('#')[1]);

    if (playGame) return <Redirect to={ `/golf/game/${playGame}` } />

    return (
        <>
            <ModuleHeader label="Games"
                screenheader={ true }
                loading={ gameListDataIsLoading } />
            <PageContainer>
                <PageContent>
                    <div className="c-box">
                        <IntroPanel
                            icon={ <SportsGolfIcon className="c-content-icon plain" /> }>
                            <NavLink className="a-intro-link" to="/golf/settings/games/new">
                                <FlexContainer className="intro-summary" alignitems="center">
                                    <FlexItem>
                                        <h3 className="h-intro">Add a Game</h3>
                                        <p>Do you feel lucky, punk?</p>
                                    </FlexItem>
                                    <FlexItem narrow>
                                        <ArrowForwardIosIcon className="action-intro" />
                                    </FlexItem>
                                </FlexContainer>
                            </NavLink>
                        </IntroPanel>
                    </div>
                    <GameList
                        games={ games }
                        onDelete={ onDeleteGameHandler }
                        onSave={ onSaveGameHandler }
                        onPlay={ onPlayGameHandler } />
                </PageContent>
            </PageContainer>
            <Dialog
                open={ deletedGame !== undefined }
                onClose={ deleteGameConfirmCloseHandler() }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Delete { deletedGame ? deletedGame.gameName.value : '' }?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ok, this is final so you get an 'are you sure' pop-up, sorry.
                        You realy want to delete: { deletedGame ? deletedGame.gameName.value : '' }?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={ classes.root }>
                    <Button className={ classes.button } onClick={ deleteGameConfirmCloseHandler() } color="primary">
                        Ah, sorry,<br/>didn't mean it
                    </Button>
                    <Button className={ classes.angryButton } onClick={ deleteGameConfirmCloseHandler(true) } color="primary" autoFocus>
                        Yep, delete already!
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ManageGames;
