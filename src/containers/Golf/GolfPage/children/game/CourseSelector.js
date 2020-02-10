import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Paper, Grid } from '@material-ui/core';

import formStyles from '@golfstyles/form.style';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: '1rem',
        minHeight: '14.5rem'
    },
    gridItem: {
        flexGrow: 1,
        position: 'relative'
    }
}));

const CourseSelector = ({courses = [], onChange }) => {

    const classes = formStyles();
    const classesmui = useStyles();

    const [selectedCourse, setSelectedCourse] = useState();

    const handleListItemClick = course => () => {

        setSelectedCourse(course);
        if(onChange) onChange(course);
    };

    return (
        <>
            <header className="c-header--sec">Select course</header>
            <Grid container className={ classesmui.root }>
                <Grid item className={ classesmui.gridItem }>
                    <Paper className={ classes.listContainer }>
                        <List dense 
                            className={ classes.selectorList }
                            component="div"
                            role="list">
                        {
                            courses && courses.map((course, idx) => {

                                const secondaryText = `${ course.courseSlope.label }: ${ course.courseSlope.value }, holes: ${ course.courseHoles.value.length }`;

                                return <ListItem key={ idx }
                                    className={ classes.listItem }
                                    role="listitem"
                                    selected={ selectedCourse === course }
                                    onClick={ handleListItemClick(course) }
                                    button>
                                    <ListItemText
                                        primary={ course.courseName.value }
                                        secondary={
                                            <>
                                                <Typography component="span"
                                                    variant="body2"
                                                    className={ classes.inline }
                                                    color="textPrimary">
                                                    { secondaryText }
                                                </Typography>
                                            </>
                                        }/>
                                </ListItem>
                            })
                        }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default CourseSelector;
