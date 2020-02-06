import React, { useState, useEffect } from 'react';
import useGames from '@hooks/useGames';
import { FlexContainer } from '@styles/layout.style';
import HoleNavigator from './HoleNavigator';
import HoleHistory from './HoleHistory';
import addStrokeToHole from '@utils/addStrokeToHole';
import ClubActionList from './ClubActionList';
import useClubDefinitions from '@hooks/useClubDefinitions';

const PlayGame = ({
    match
}) => {

    const { params: { gameid } } = match;
   
    const [reload, setReload] = useState(false);
    const [game, setGame] = useState();
    const [currHole, setCurrHole] = useState();
    
    const clubTypeData = useClubDefinitions();
    const gameData = useGames(clubTypeData.clubTypes, clubTypeData.clubType, reload, gameid);

    const onClubActionHandler = club => {

        addStrokeToHole(club, currHole.iri, game, gameData.doc, setGame);
    };

    const onChangeHoleHandler = (holeIndex) => {

        game && setCurrHole(game.gameCourse.value.courseHoles.value[holeIndex]);
    };

    useEffect(() => {

        if (gameData) {

            setGame(gameData.list.find(game => game.iri.includes(gameid)));
            setReload(false);
        }


    }, [gameData]);

    const clubs = game && game.gameBag.value.clubs.value;

    return (
        <FlexContainer vertical flex="1 0 auto" alignitems="stretch">
            <HoleNavigator holes={ game && game.gameCourse.value.courseHoles.value } onChangeHole={ onChangeHoleHandler } />
            <HoleHistory hole={ currHole } />
            <ClubActionList clubs={ clubs } onAction={ onClubActionHandler }/>
        </FlexContainer>
    );
};

export default PlayGame;
