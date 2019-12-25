import React from 'react';

import HoleForm from './HoleForm';
import HoleList from './HoleList';

const ManageHoles = ({ onSave, listTitle = 'Holes', holes = [] }) => {

    const onSaveHoleHandler = (hole) => {

        onSave(hole);
    }

    return <div>
        <HoleForm onSave={ onSaveHoleHandler }/>
        <HoleList holes listTitle/>
    </div>
}

export default ManageHoles;
