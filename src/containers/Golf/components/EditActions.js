import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const EditActions = ({
    onEdit,
    onDelete
}) => {

    const showDelete = onDelete !== undefined;

    return (
        <div>
            <IconButton
                aria-label="edit"
                onClick={ onEdit }>
                <EditIcon />
            </IconButton>
            {
                showDelete && <IconButton
                    aria-label="delete"
                    onClick={ onDelete }>
                    <DeleteIcon />
                </IconButton>
            }
        </div>
    );
}

export default EditActions;
