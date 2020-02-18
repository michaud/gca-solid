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

const CourseSelector = ({ courses = [], selected, onChange }) => {

    const [selectedCourse, setSelectedCourse] = useState(selected);
    const classes = formStyles();
    const classesmui = useStyles();


    const handleListItemClick = course => () => {

        setSelectedCourse(course);
        if(onChange) onChange(course);
    };

    return (
        <>
            <header className="c-header nudge">Select course</header>
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
                                const isSelected = course !== undefined && selectedCourse !== undefined && (selectedCourse.iri.split("#")[1] === course.iri.split("#")[1]); 

                                return <ListItem key={ idx }
                                    className={ classes.listItem }
                                    role="listitem"
                                    selected={ isSelected }
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
