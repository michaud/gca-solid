import React from 'react';

import { NavLink } from 'react-router-dom';

import IntroPanel from './IntroPanel';
import CapIcon from '@containers/Golf/components/CapIcon';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import SportsGolfIcon from '@material-ui/icons/SportsGolf';
import BagIcon from '@containers/Golf/components/BagIcon';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { FlexContainer, FlexItem } from '@styles/layout.style';
import ModuleHeader from '../ModuleHeader';

const Home = ({
    hasPlayerData,
    hasMarkerData,
    hasClubData,
    hasBagData,
    hasGameData,
    hasCourseData
}) => {

    return (
        <div>
            <ModuleHeader label="Golf Course assistant" screenheader={ true }/>
            { !hasPlayerData ? (
                <IntroPanel
                    icon={ <CapIcon className="c-content-icon"/> }>
                        <FlexContainer flex="1">
                            <FlexItem>
                                <NavLink className="a-intro-link" to="/golf/settings/players">
                                    <FlexContainer flex="1" alignitems="center">
                                        <FlexItem>
                                            <h3 className="h-intro">Update You</h3>
                                        </FlexItem>
                                        <FlexItem narrow>
                                            <ArrowForwardIosIcon className="action-intro--inside"/>
                                        </FlexItem>
                                    </FlexContainer>
                                </NavLink>
                            </FlexItem>
                            { !hasMarkerData ? (
                                <FlexItem>
                                    <NavLink className="a-intro-link" to="/golf/settings/player">
                                        <FlexContainer flex="1" alignitems="center">
                                            <FlexItem>
                                                <h3 className="h-intro">Add a Marker</h3>
                                                <p>Your pals</p>
                                            </FlexItem>
                                            <FlexItem narrow>
                                                <ArrowForwardIosIcon className="action-intro"/>
                                            </FlexItem>
                                        </FlexContainer>
                                    </NavLink>
                                </FlexItem>
                            ) : null }
                        </FlexContainer>
                </IntroPanel>
            ) : null }
            { !hasClubData ? (
                <IntroPanel
                    icon={ <BagIcon className="c-content-icon"/> }>
                        <FlexContainer flex="1">
                            <FlexItem>
                                <NavLink className="a-intro-link" to="/golf/settings/bag">
                                    <FlexContainer flex="1" alignitems="center">
                                        <FlexItem>
                                            <h3 className="h-intro">Add Clubs</h3>
                                            <p>Your arsenal</p>
                                        </FlexItem>
                                        <FlexItem narrow>
                                            <ArrowForwardIosIcon className="action-intro--inside"/>
                                        </FlexItem>
                                    </FlexContainer>
                                </NavLink>
                            </FlexItem>
                            { !hasBagData ? (
                                <FlexItem>
                                    <NavLink className="a-intro-link" to="/golf/settings/bag">
                                        <FlexContainer flex="1" alignitems="center">
                                            <FlexItem>
                                                <h3 className="h-intro">Fill your bag</h3>
                                                <p>What's i/t bag?</p>
                                            </FlexItem>
                                            <FlexItem narrow>
                                                <ArrowForwardIosIcon className="action-intro"/>
                                            </FlexItem>
                                        </FlexContainer>
                                    </NavLink>
                                </FlexItem>
                            ) : null }
                        </FlexContainer>
                </IntroPanel>
            ) : null }
            { !hasCourseData ? (
                <IntroPanel
                    icon={ <GolfCourseIcon className="c-content-icon"/> }>
                        <NavLink className="a-intro-link" to="/golf/settings/courses">
                            <FlexContainer alignitems="center">
                                <FlexItem>
                                    <h3 className="h-intro">Add a Course</h3>
                                    <p>Where do you play?</p>
                                </FlexItem>
                                <FlexItem narrow>
                                    <ArrowForwardIosIcon className="action-intro"/>
                                </FlexItem>
                            </FlexContainer>
                        </NavLink>
                </IntroPanel>
            ) : null }
            { !hasGameData ? (
                <IntroPanel
                    icon={ <SportsGolfIcon className="c-content-icon"/> }>
                        <NavLink className="a-intro-link" to="/golf/settings/games">
                            <FlexContainer alignitems="center">
                                <FlexItem>
                                    <h3 className="h-intro">Add a Game</h3>
                                    <p>Do you feel lucky, punk?</p>
                                </FlexItem>
                                <FlexItem narrow>
                                    <ArrowForwardIosIcon  className="action-intro"/>
                                </FlexItem>
                            </FlexContainer>
                        </NavLink>
                </IntroPanel>
            ) : null }
            { hasGameData ? (
                <IntroPanel
                    icon={ <CapIcon className="c-content-icon"/> }>
                        <NavLink className="a-intro-link" to="/golf/settings/games">
                            <FlexContainer alignitems="center">
                                <FlexItem>
                                    <h3 className="h-intro">Start a game</h3>
                                    <p>Do you feel lucky, punk?</p>
                                </FlexItem>
                                <FlexItem narrow>
                                    <ArrowForwardIosIcon className="action-intro"/>
                                </FlexItem>
                            </FlexContainer>
                        </NavLink>
                </IntroPanel>
            ) : (
                <IntroPanel className="disabled"
                    icon={ <CapIcon className="c-content-icon"/> }>
                        <FlexContainer alignitems="center">
                            <FlexItem>
                                <h3 className="h-intro">Start a game</h3>
                                <p>First add your info</p>
                            </FlexItem>
                            <FlexItem narrow>
                                <ArrowForwardIosIcon className="action-intro--disabled"/>
                            </FlexItem>
                        </FlexContainer>
                </IntroPanel>
            )            
            }
        </div>
    );
};

export default Home;
