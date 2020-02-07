import React, { useState, useEffect } from 'react';

import HoleForm from './HoleForm';
import HoleTable from './HoleTable';

const initAvailableSI = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

const ManageHoles = ({
    holes = [],
    onSave,
    onSaveEdit,
    listTitle = 'Holes'
}) => {

    const [holeNumber, setHoleNumber] = useState(holes.length + 1);
    const [availableStrokeIndices, setAvailableStrokeIndices] = useState([...initAvailableSI]);
    const [editHole, setEditHole] = useState();

    useEffect(() => {

        let didCancel = false;

        if(!didCancel) setHoleNumber(holes.length + 1);

        if(editHole) {

            if(!didCancel) setAvailableStrokeIndices([...initAvailableSI]);
        
        } else {

            if(!didCancel) setAvailableStrokeIndices(state => {

                const newState = state.reduce((acc, SI) => {

                    const used = editHole !== undefined ?
                        false :
                        holes.find(hole => parseInt(hole.holeStrokeIndex.value) === SI);

                    if(!used) acc.push(SI)

                    return acc;

                },[]);

                return newState;
            });
        }

        return () => { didCancel = true; }

    }, [holes, editHole])

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
