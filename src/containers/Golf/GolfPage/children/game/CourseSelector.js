import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        height: '5rem',
        flexGrow: 1,
        marginBottom: '2rem',
        minHeight: '10rem',
        '&.MuiList-padding': {
            paddingTop: 0,
            paddingBottom: 0
        }
    },
    listItem: {
        paddingLeft: '.5rem',
        paddingRight: '.5rem'
    },
    listItemIcon: {
        minWidth: '2.5rem'
    },
    listItemText: {
        margin: '.125rem 0'
    }
}));

const CourseSelector = ({courses = []}) => {

    const classes = useStyles();

    return <>
        <header className="c-header--sec">Select course</header>
        <Paper className={ classes.paper }>
            <List className={ classes.root } role="list">
            {
                courses && courses.map((course, idx) => {

                    const secondaryText = `${ course.fields.courseSlope.field.label }: ${ course.fields.courseSlope.field.value }, holes: ${ course.fields.courseHoles.field.value.length }`;
                    return <ListItem key={ idx } className={ classes.listItem } role="listitem" button >
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
    </>;
};

export default CourseSelector;
