import React from 'react';

import HoleDetail from './HoleDetail';
import HoleForm from './HoleForm';

const ManageHoles = ({ onSave, listTitle = 'Holes', holes = [] }) => {

    const onSaveHoleHandler = (hole) => {

        onSave(hole);
    }

    return <div>
        <HoleForm onSave={ onSaveHoleHandler }/>
        <header className="c-header">{ listTitle }</header>
        {
            holes.map((hole, index) => <HoleDetail key={ index } hole={ hole }/>)
        }
    </div>
}

export default ManageHoles;
