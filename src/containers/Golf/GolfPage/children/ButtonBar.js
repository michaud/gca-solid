import React from 'react';

import { NavLink, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import SportsGolfIcon from '@material-ui/icons/SportsGolf';
import BagIcon from '@containers/Golf/components/BagIcon';
import AppIcon from '@containers/Golf/components/AppIcon';
import CapIcon from '@containers/Golf/components/CapIcon';

const useStyles = makeStyles(theme => ({
    root: {
        width: '2.25rem',
        height: '2.25rem',
        margin: '.1rem 0 0 .1rem'
    }
}));


const ButtonBar = () => {

    const classes = useStyles();

    return (
        <div style={{ display: 'flex' }}>
            <NavLink className="btn--action wide" to={{ pathname: '/golf/settings/games' }}>
                <div className="btn--action__label"><SportsGolfIcon/><div>Games</div></div>
            </NavLink>
            <NavLink className="btn--action wide" to={{ pathname: '/golf/settings/courses' }}>
                <div className="btn--action__label"><GolfCourseIcon/><div>Courses</div></div>
            </NavLink>
            <NavLink className="btn--action wide" to={{ pathname: '/golf/settings/bag' }}>
                <div className="btn--action__label"><BagIcon/><div>Bag</div></div>
            </NavLink>
            <NavLink className="btn--action wide" to={{ pathname: '/golf/settings/players' }}>
                <div className="btn--action__label"><CapIcon/><div>Players</div></div>
            </NavLink>
            <Link className="btn--action f-btn--knob" to={{ pathname: '/golf/settings' }}>
                <div className="btn--action__label"><AppIcon className={ classes.root }/></div>
            </Link>
        </div>
    );
}

export default ButtonBar;
