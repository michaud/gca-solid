import React, { useState, useEffect } from 'react';

import HoleForm from './HoleForm';
import HoleTable from './HoleTable';

const ManageHoles = ({ onSave, onSaveEdit, listTitle = 'Holes', holes = [] }) => {

    const [holeNumber, setHoleNumber] = useState(holes.length + 1);
    const [editHole, setEditHole] = useState();

    useEffect(() => {
        setHoleNumber(holes.length + 1);
    }, [holes])

    const onSaveHoleHandler = hole => {

        setHoleNumber(state => state + 1);
        onSave(hole);
    };

    const onSaveEditHoleHandler = hole => {

        onSaveEdit(hole);
        setEditHole();
    };

    const editHoleHandler = idx => {

        setEditHole(holes[idx]);
    };

    return <>
        <HoleForm
            hole={ editHole }
            onSave={ onSaveHoleHandler }
            onEdit={ onSaveEditHoleHandler }
            holeNumber={ holeNumber }
            actionLabel={ editHole ? 'save hole' : 'add hole' }/>
        <HoleTable
            holes={ holes }
            onEditHole={ editHoleHandler }
            listTitle={ listTitle }/>
    </>
}

export default ManageHoles;
