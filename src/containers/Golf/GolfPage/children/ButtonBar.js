import React from 'react';

import { NavLink } from 'react-router-dom';
import { slide } from '@components/transitions';

import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import SportsGolfIcon from '@material-ui/icons/SportsGolf';
import BagIcon from '@containers/Golf/components/BagIcon';
import AppIcon from '@containers/Golf/components/AppIcon';
import CapIcon from '@containers/Golf/components/CapIcon';

const ButtonBar = () => {

    return (
        <div style={{ display: 'flex' }}>
            <NavLink className="btn--action wide" to={{ pathname: '/golf/settings/games', state: slide }}>
                <div className="btn--action__label"><SportsGolfIcon/><div>Games</div></div>
            </NavLink>
            <NavLink className="btn--action wide" to={{ pathname: '/golf/settings/courses', state: slide }}>
                <div className="btn--action__label"><GolfCourseIcon/><div>Courses</div></div>
            </NavLink>
            <NavLink className="btn--action wide" to={{ pathname: '/golf/settings/bag', state: slide }}>
                <div className="btn--action__label"><BagIcon/><div>Bag</div></div>
            </NavLink>
            <NavLink className="btn--action wide" to={{ pathname: '/golf/settings/players', state: slide }}>
                <div className="btn--action__label"><CapIcon/><div>Players</div></div>
            </NavLink>
            <NavLink className="btn--action f-btn--knob" to={{ pathname: '/golf/settings', state: slide }}>
                <div className="btn--action__label"><AppIcon/></div>
            </NavLink>
        </div>
    );
}

export default ButtonBar;
