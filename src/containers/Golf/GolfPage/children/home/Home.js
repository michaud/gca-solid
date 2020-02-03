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
import { PageContainer } from '@styles/page.style';

const Home = ({ location }) => {
    
    const { state = {} } = location;

    let hasPlayerData,
    hasMarkerData,
    hasClubData,
    hasBagData,
    hasCourseData,
    hasGameData = false;

    if(state && state.data && Object.keys(state.data).length > 0) {
        hasPlayerData = state.data.hasPlayerData;
        hasMarkerData = state.data.hasMarkerData;
        hasClubData = state.data.hasClubData;
        hasBagData = state.data.hasBagData;
        hasCourseData = state.data.hasCourseData;
        hasGameData = state.data.hasGameData;
    }

    return (
        <div>
            <ModuleHeader label="Golf Course assistant" screenheader={ true }/>
            <PageContainer>

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
            </PageContainer>
        </div>
    );
};

export default Home;
