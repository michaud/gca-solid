import React, { useState, useEffect } from 'react';

import formStyles from '@golfstyles/form.style';
import Button from '@material-ui/core/Button';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

import {
    HoleNavigatorContainer,
    FlexToolLeft,
    FlexContainer,
    FlexItem,
    FlexToolRight
} from '@golfstyles/layout.style';

const HoleNavigator = ({ holes, onChangeHole }) => {

    const classes = formStyles();
    const [currHoleIndex, setCurrHoleIndex] = useState(0);

    const onNextHole = () => {
        const lastIndex = holes.length - 1;
        setCurrHoleIndex(state => {
            const newState = state < lastIndex ? state + 1 : lastIndex;
            onChangeHole && onChangeHole(newState);
            return newState;
        });
    };

    const onPreviousHole = () => {

        setCurrHoleIndex(state => {
            const newState = state > 0 ? state - 1 : 0;
            onChangeHole && onChangeHole(newState);
            return newState;
        });
    };


    useEffect(() => {

        if(onChangeHole) onChangeHole(currHoleIndex);

    }, [holes]);

    const currHole = holes ? holes[currHoleIndex] : undefined;
    const canPrevious = currHoleIndex > 0;
    const canNext = holes ? currHoleIndex < holes.length - 1 : false;

    return (
        <HoleNavigatorContainer alignitems="stretch">
            <FlexToolLeft>
                <Button
                    variant="contained"
                    className={classes.toolButton}
                    onClick={onPreviousHole}
                    disabled={!canPrevious}
                    color="primary"><ArrowBackIosRoundedIcon /></Button>
            </FlexToolLeft>
            <FlexContainer vertical flex="1 0 auto" alignitems="stretch">
                <FlexContainer center flex="1 0 auto" alignitems="stretch">
                    <FlexContainer flex="1 0 auto" center>
                        <div className="u-pad--airy">
                            <div>{ currHole && `hole ${ currHole.holeNumber.value }` }</div>
                            <div>{ currHole && `${ currHole.holeLength.value } m` }</div>
                        </div>
                    </FlexContainer>
                    <FlexItem narrow>
                        {currHole && <table className="select-hole__info">
                            <tbody>
                                <tr>
                                    <td className="hole-info__par">{ currHole.holePar.label }</td>
                                    <td className="hole-info__par-value">{ currHole.holePar.value }</td>
                                    <td className="score__strokes">strokes</td>
                                    <td className="score__strokes-value">6</td>
                                </tr>
                                <tr>
                                    <td className="hole-info__si">SI</td>
                                    <td className="hole-info__si-value">{ currHole.holeStrokeIndex.value }</td>
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
                    color="primary"><ArrowForwardIosRoundedIcon /></Button>
            </FlexToolRight>
        </HoleNavigatorContainer>
    );
};

export default HoleNavigator;
