import React, { useState } from 'react';

import formStyles from '@styles/form.style';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const CourseSelector = ({courses = [], onChange }) => {

    const classes = formStyles();
    const [selectedCourse, setSelectedCourse] = useState();

    const handleListItemClick = course => () => {

        setSelectedCourse(course);
        if(onChange) onChange(course);
    };

    return (
        <>
            <header className="c-header--sec">Select course</header>
            <Paper className={ classes.paper }>
                <List className={ classes.selectorList } role="list">
                {
                    courses && courses.map((course, idx) => {

                        const secondaryText = `${ course.fields.courseSlope.field.label }: ${ course.fields.courseSlope.field.value }, holes: ${ course.fields.courseHoles.field.value.length }`;

                        return <ListItem key={ idx }
                            className={ classes.listItem }
                            role="listitem"
                            selected={ selectedCourse === course }
                            onClick={ handleListItemClick(course) }
                            button>
                            <ListItemText
                                primary={ course.fields.courseName.field.value }
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
        </>
    );
};

export default CourseSelector;
