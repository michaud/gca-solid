import React from 'react';

import { NavLink, Link } from 'react-router-dom';

import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import SportsGolfIcon from '@material-ui/icons/SportsGolf';
import BagIcon from '@containers/Golf/components/BagIcon';
import AppIcon from '@containers/Golf/components/AppIcon';
import CapIcon from '@containers/Golf/components/CapIcon';
import { FlexContainer } from '@golfstyles/layout.style';

const ButtonBar = () => {

    return (
        <FlexContainer>
            <NavLink className="btn--action wide" to="/golf/settings/games">
                <div className="btn--action__label">
                    <SportsGolfIcon/>
                    <div>Games</div>
                </div>
            </NavLink>
            <NavLink className="btn--action wide" to="/golf/settings/courses">
                <div className="btn--action__label">
                    <GolfCourseIcon/>
                    <div>Courses</div>
                </div>
            </NavLink>
            <NavLink className="btn--action wide" to="/golf/settings/bag">
                <div className="btn--action__label">
                    <BagIcon/>
                    <div>Bag</div>
                </div>
            </NavLink>
            <NavLink className="btn--action wide" to="/golf/settings/players">
                <div className="btn--action__label">
                    <CapIcon/>
                    <div>Players</div>
                </div>
            </NavLink>
            <Link className="btn--action f-btn--knob" to="/golf/settings">
                <div className="btn--action__label">
                    <AppIcon className="f-btn--knop__icon"/>
                </div>
            </Link>
        </FlexContainer>
    );
}

export default ButtonBar;
