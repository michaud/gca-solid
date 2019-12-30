import React from 'react';

import HoleForm from './HoleForm';
import HoleList from './HoleList';

const ManageHoles = ({ onSave, listTitle = 'Holes', holes = [] }) => {

    const onSaveHoleHandler = (hole) => {

        onSave(hole);
    }

    return <>
        <HoleForm onSave={ onSaveHoleHandler }/>
        <HoleList holes={ holes } listTitle={ listTitle }/>
    </>
}

export default ManageHoles;
