import React, { useState, useEffect } from 'react';

import HoleForm from './HoleForm';
import HoleTable from './HoleTable';

const ManageHoles = ({
    holes = [],
    onSave,
    onSaveEdit,
    listTitle = 'Holes'
}) => {

    const [holeNumber, setHoleNumber] = useState(holes.length + 1);
    const [availableStrokeIndices, setAvailableStrokeIndices] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]);
    const [editHole, setEditHole] = useState();

    useEffect(() => {
        setHoleNumber(holes.length + 1);
        setAvailableStrokeIndices(state => {
            const newState = state.reduce((acc, SI) => {

                const used = holes.find(hole => parseInt(hole.holeStrokeIndex.value) === SI);
                if(!used) acc.push(SI)
                return acc;
            },[]);

            return newState;
        });

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

    return (
        <>
            <HoleForm
                hole={ editHole }
                onSave={ onSaveHoleHandler }
                onEdit={ onSaveEditHoleHandler }
                holeNumber={ holeNumber }
                availableStrokeIndices={ availableStrokeIndices }
                actionLabel={ editHole ? 'save hole' : 'add hole' }/>
            <HoleTable
                holes={ holes }
                onEditHole={ editHoleHandler }
                listTitle={ listTitle }/>
        </>
    );
};

export default ManageHoles;
