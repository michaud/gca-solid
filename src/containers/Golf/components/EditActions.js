import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import formStyles from '@golfstyles/form.style';

const EditActions = ({ onEdit }) => {

    const classes = formStyles();

    return (
        <div>
            <IconButton
                className={ classes.editIconButton }
                aria-label="edit"
                onClick={ onEdit }>
                <EditIcon />
            </IconButton>
        </div>
    );
}

export default EditActions;
