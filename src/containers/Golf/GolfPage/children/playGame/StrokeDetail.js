import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import { FlexContainer, FlexItem } from '@golfstyles/layout.style';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import formStyles from '@golfstyles/form.style';

const StrokeDetail = ({ stroke, distance, onDelete }) => {

    const classes = formStyles();

    const onDeleteStrokeHandler = () => {
        onDelete(stroke);
    };

    return (
        <FlexContainer alignitems="center" className="c-intro-panel u-pad--handlebars">
            <FlexItem vertical>
            { stroke.strokeClub.value.clubType.value.label } { distance ? `${ distance }m` : '' }
            </FlexItem>
            <FlexItem narrow>
                <IconButton
                    className={ classes.editIconButton }
                    aria-label="delete"
                    onClick={ onDeleteStrokeHandler }>
                    <DeleteForeverIcon fontSize="large" fill="orange"/>
                </IconButton>
            </FlexItem>
        </FlexContainer>
    );
};

export default StrokeDetail;
