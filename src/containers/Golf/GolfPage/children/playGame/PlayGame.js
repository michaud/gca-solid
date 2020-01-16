import React, { useState, useEffect } from 'react';
import { useNotification } from '@inrupt/solid-react-components';
import useClubDefinitions from '@hooks/useClubDefinitions';
import formStyles from '@styles/form.style';
import useGames from '@hooks/useGames';
import { errorToaster } from '@utils/';
import { useTranslation } from 'react-i18next';
import {
    HoleNavigatorContainer,
    FlexToolLeft,
    FlexToolRight,
    FlexItem,
    FlexContainer

} from '@styles/layout.style';
import Button from '@material-ui/core/Button';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
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
    const [currHoleIndex, setCurrHoleIndex] = useState(0);
    const classes = formStyles();
    const { t } = useTranslation();
    
    const gameData = useGames(clubTypeDefinitions, reload, gameid);

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

    const onPreviousHole = () => {

        setCurrHoleIndex(state => state > 0 ? state - 1 : 0);
    };

    const onNextHole = () => {
        const lastIndex = game.fields.gameCourse.field.value.fields.courseHoles.field.value.length -1;
        setCurrHoleIndex(state => state < lastIndex ? state + 1 : lastIndex);
    };

    console.log('game: ', game);
    const currHole = game ? game.fields.gameCourse.field.value.fields.courseHoles.field.value[currHoleIndex] : undefined;
    const canPrevious = currHoleIndex > 0;
    const canNext = game ? currHoleIndex < game.fields.gameCourse.field.value.fields.courseHoles.field.value.length - 1 : false;
    const clubs = game && game.fields.gameBag.field.value.fields.clubs.field.value;
    return (
        <FlexContainer vertical flex="1 0 auto" alignitems="stretch">
            <HoleNavigatorContainer alignitems="stretch">
                <FlexToolLeft>
                    <Button
                        variant="contained"
                        className={ classes.toolButton }
                        onClick={ onPreviousHole }
                        disabled={ !canPrevious }
                        color="primary"><ArrowBackIosRoundedIcon/></Button>
                </FlexToolLeft>
                <FlexContainer vertical flex="1 0 auto" alignitems="stretch">
                    <FlexContainer center flex="1 0 auto" alignitems="stretch">
                        <FlexContainer flex="1 0 auto" center>
                            <div className="u-pad--airy">{ currHole && `hole ${ currHole.fields.holeNumber.field.value }, ${ currHole.fields.holeLength.field.value }m` }</div>
                        </FlexContainer>
                        <FlexItem narrow>
                            { currHole && <table className="select-hole__info">
                                    <tbody>
                                        <tr>
                                            <td className="hole-info__par">{ currHole.fields.holePar.field.label }</td>
                                            <td className="hole-info__par-value">{ currHole.fields.holePar.field.value }</td>
                                            <td className="score__strokes">strokes</td>
                                            <td className="score__strokes-value">6</td>
                                        </tr>
                                        <tr>
                                            <td className="hole-info__si">SI</td>
                                            <td className="hole-info__si-value">{ currHole.fields.holeStrokeIndex.field.value }</td>
                                            <td className="score__points">points</td>
                                            <td className="score__points-value">3</td>
                                        </tr>

                                    </tbody>
                                </table>
                            }
                        </FlexItem>
                    </FlexContainer>
                </FlexContainer>
                <FlexToolRight>
                    <Button
                        variant="contained"
                        className={ classes.toolButton }
                        onClick={ onNextHole }
                        disabled={ !canNext }
                        color="primary"><ArrowForwardIosRoundedIcon/></Button>
                </FlexToolRight>
            </HoleNavigatorContainer>
            <div>
                {
                    clubs && clubs.map((club, idx) => <div key={ idx }>{ club.fields.clubName.field.value }</div>)
                }
            </div>
        </FlexContainer>
    );
};

export default PlayGame;
