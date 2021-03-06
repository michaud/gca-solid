import React from 'react';

import { NavLink } from 'react-router-dom';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import SportsGolfIcon from '@material-ui/icons/SportsGolf';

import { useMonitorData } from '@golfcontexts/dataProvider/AppDataProvider';

import IntroPanel from '@golf/components/IntroPanel';
import CapIcon from '@golf/components/CapIcon';
import BagIcon from '@golf/components/BagIcon';
import ModuleHeader from '@golf/components/ModuleHeader';

import AllowLocation from '@golfpagectrl/home/AllowLocation';
import Help from '@golfpagectrl/home/Help';

import { FlexContainer, FlexItem } from '@golfstyles/layout.style';
import { PageContainer, PageContent } from '@golfstyles/page.style';
import About from '@golfpagectrl/home/About';

const Home = () => {

    const {
        progress,
        count,
        hasPlayerDetails,
        hasMarkers,
        hasClubs,
        hasBagClubs,
        hasCourses,
        hasGames
     } = useMonitorData();

    const showHelpFirst = !hasPlayerDetails && !hasMarkers && !hasClubs && !hasBagClubs && !hasCourses && !hasGames;

    return (
        <div>
            <ModuleHeader label="Golf Course assistant" screenheader={ true } loading={ count !== progress } />
            <PageContent>
                {
                    count === progress && <PageContainer>
                        { showHelpFirst ? <Help/> : null }
                        { !hasPlayerDetails ? (
                            <IntroPanel
                                icon={ <CapIcon className="c-content-icon plain" /> }>
                                <FlexContainer flex="1">
                                    <FlexItem className="intro-summary">
                                        <NavLink className="a-intro-link" to="/golf/settings/players">
                                            <FlexContainer flex="1" alignitems="center">
                                                <FlexItem>
                                                    <h3 className="h-intro">Update You</h3>
                                                </FlexItem>
                                                <FlexItem narrow>
                                                    <ArrowForwardIosIcon className="action-intro--inside" />
                                                </FlexItem>
                                            </FlexContainer>
                                        </NavLink>
                                    </FlexItem>
                                    { !hasMarkers ? (
                                        <FlexItem>
                                            <NavLink className="a-intro-link" to="/golf/settings/player">
                                                <FlexContainer className="intro-summary" flex="1" alignitems="center">
                                                    <FlexItem>
                                                        <h3 className="h-intro">Add Markers</h3>
                                                    </FlexItem>
                                                    <FlexItem narrow>
                                                        <ArrowForwardIosIcon className="action-intro" />
                                                    </FlexItem>
                                                </FlexContainer>
                                            </NavLink>
                                        </FlexItem>
                                    ) : null }
                                </FlexContainer>
                            </IntroPanel>
                        ) : null }
                        { !hasClubs ? (
                            <IntroPanel
                                icon={ <BagIcon className="c-content-icon plain" /> }>
                                <FlexContainer flex="1">
                                    <FlexItem>
                                        <NavLink className="a-intro-link" to="/golf/settings/bag">
                                            <FlexContainer className="intro-summary" flex="1" alignitems="center">
                                                <FlexItem>
                                                    <h3 className="h-intro">Add Clubs</h3>
                                                </FlexItem>
                                                <FlexItem narrow>
                                                    <ArrowForwardIosIcon className="action-intro--inside" />
                                                </FlexItem>
                                            </FlexContainer>
                                        </NavLink>
                                    </FlexItem>
                                    { !hasBagClubs ? (
                                        <FlexItem>
                                            <NavLink className="a-intro-link" to="/golf/settings/bag">
                                                <FlexContainer className="intro-summary" flex="1" alignitems="center">
                                                    <FlexItem>
                                                        <h3 className="h-intro">Fill the Bag</h3>
                                                    </FlexItem>
                                                    <FlexItem narrow>
                                                        <ArrowForwardIosIcon className="action-intro" />
                                                    </FlexItem>
                                                </FlexContainer>
                                            </NavLink>
                                        </FlexItem>
                                    ) : null }
                                </FlexContainer>
                            </IntroPanel>
                        ) : null }
                        { !hasCourses ? (
                            <IntroPanel
                                icon={ <GolfCourseIcon className="c-content-icon plain" /> }>
                                <NavLink className="a-intro-link" to="/golf/settings/courses">
                                    <FlexContainer className="intro-summary" alignitems="center">
                                        <FlexItem>
                                            <h3 className="h-intro">Add a Course</h3>
                                            <p>Where do you play?</p>
                                        </FlexItem>
                                        <FlexItem narrow>
                                            <ArrowForwardIosIcon className="action-intro" />
                                        </FlexItem>
                                    </FlexContainer>
                                </NavLink>
                            </IntroPanel>
                        ) : null }
                        { !hasGames ? (
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
                        ) : null }
                        { hasGames ? (
                            <IntroPanel
                                icon={ <CapIcon className="c-content-icon plain" /> }>
                                <NavLink className="a-intro-link" to="/golf/settings/games">
                                    <FlexContainer className="intro-summary" alignitems="center">
                                        <FlexItem>
                                            <h3 className="h-intro">Start a game</h3>
                                            <p>Do you feel lucky, punk?</p>
                                        </FlexItem>
                                        <FlexItem narrow>
                                            <ArrowForwardIosIcon className="action-intro" />
                                        </FlexItem>
                                    </FlexContainer>
                                </NavLink>
                            </IntroPanel>
                        ) : (
                                <IntroPanel className="disabled"
                                    icon={ <CapIcon className="c-content-icon plain" /> }>
                                    <FlexContainer className="intro-summary" alignitems="center">
                                        <FlexItem >
                                            <h3 className="h-intro">Start a Game</h3>
                                            <p>First add a game</p>
                                        </FlexItem>
                                        <FlexItem narrow>
                                            <ArrowForwardIosIcon className="action-intro" />
                                        </FlexItem>
                                    </FlexContainer>
                                </IntroPanel>
                            ) }
                        <AllowLocation />
                        { !showHelpFirst ? <Help/> : null }
                        <About/>
                    </PageContainer>
                }
            </PageContent>
        </div>
    );
};

export default Home;
