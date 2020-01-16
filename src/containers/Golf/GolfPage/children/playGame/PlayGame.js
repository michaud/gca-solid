import React, { useState, useEffect } from 'react';
import { useNotification } from '@inrupt/solid-react-components';
import useClubDefinitions from '@hooks/useClubDefinitions';
import useGames from '@hooks/useGames';
import { errorToaster } from '@utils/';
import { useTranslation } from 'react-i18next';
import { FlexContainer } from '@styles/layout.style';
import HoleNavigator from './HoleNavigator';
import HoleHistory from './HoleHistory';
import ClubActions from './ClubActions';
import addStrokeToHole from '@utils/addStrokeToHole';


const PlayGame = ({
    match,
    webId,
    history
}) => {

    const { params: { gameid } } = match;
    
    const { notification } = useNotification(webId);
    const [reload, setReload] = useState(false);
    const clubTypeDefinitions = useClubDefinitions();
    const [game, setGame] = useState();
    const [currHole, setCurrHole] = useState();
    const { t } = useTranslation();
    
    const gameData = useGames(clubTypeDefinitions, reload, gameid);

    const onClubActionHandler = club => {

        addStrokeToHole(club, currHole.iri, game, setGame);
    };

    const onChangeHoleHandler = (holeIndex) => {

        game && setCurrHole(game.fields.gameCourse.field.value.fields.courseHoles.field.value[holeIndex]);
    };

    const init = async () => {

        try {

            if (gameData) {

                setGame(gameData.list.find(game => game.iri.includes(gameid)));

                // if(gameData.list.length > 0) {

                //     setCurrHoleIndex();
                // }
                
                setReload(false);
            }

        } catch (e) {
            /**
             * Check if something fails when we try to create a inbox
             * and show user a possible solution
             */
            if (e.name === 'Inbox Error') {
                return errorToaster(e.message, 'Error', {
                    label: t('errorCreateInbox.link.label'),
                    href: t('errorCreateInbox.link.href')
                });
            }

            errorToaster(e.message, 'Error');
        }
    };

    useEffect(() => {

        if (webId && notification.notify) init();

    }, [webId, gameData, notification.notify]);

    //console.log('game: ', game);
    const clubs = game && game.fields.gameBag.field.value.fields.clubs.field.value;

    return (
        <FlexContainer vertical flex="1 0 auto" alignitems="stretch">
            <HoleNavigator holes={ game && game.fields.gameCourse.field.value.fields.courseHoles.field.value } onChangeHole={ onChangeHoleHandler } />
            <HoleHistory hole={ currHole } />
            <ClubActions clubs={ clubs } onAction={ onClubActionHandler }/>
        </FlexContainer>
    );
};

export default PlayGame;
