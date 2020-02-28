import React, { useState, useEffect } from 'react';

import HoleForm from '@golf/GolfPage/children/hole/HoleForm';
import HoleTable from '@golf/GolfPage/children/hole/HoleTable';

const initAvailableSI = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const initAvailableHoleNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

const ManageHoles = ({
    holes = [],
    onSave,
    onSaveEdit,
    onDelete,
    listTitle = 'Holes'
}) => {

    const [holeNumber, setHoleNumber] = useState(holes.length + 1);
    const [availableStrokeIndices, setAvailableStrokeIndices] = useState([...initAvailableSI]);
    const [availableHoleNumbers, setavailableHoleNumbers] = useState([...initAvailableHoleNumbers]);

    const [editHole, setEditHole] = useState();

    useEffect(() => {

        let didCancel = false;

        const update = () => {

            if(!didCancel) {
                setHoleNumber(holes.length + 1);
                determineAvailableStrokeIndices(holes, editHole);
                determineAvailableHoleNumbers(holes, editHole);
            } 
        };

        update();

        return () => { didCancel = true; }

    }, [holes, editHole])

    const determineAvailableStrokeIndices = (holes, keepAvailableSIHole) => {

        setAvailableStrokeIndices(() => {

            const newState = initAvailableSI.reduce((acc, SI) => {

                const used = holes.find(hole => {
                    
                    return parseInt(hole.holeStrokeIndex.value) === SI;
                });

                if (
                    (
                        used &&
                        keepAvailableSIHole &&
                        used.holeStrokeIndex.value === keepAvailableSIHole.holeStrokeIndex.value
                    ) ||
                    !used
                ) {
                    acc.push(SI);
                }

                return acc;

            }, []);

            return newState;
        });
    };

    const determineAvailableHoleNumbers = (holes, keepAvailableNumberHole) => {

        setavailableHoleNumbers(() => {

            const newState = initAvailableHoleNumbers.reduce((acc, holeNumber) => {

                const used = holes.find(hole => {
                    
                    return parseInt(hole.holeNumber.value) === holeNumber;
                });

                if (
                    (
                        used &&
                        keepAvailableNumberHole &&
                        used.holeNumber.value === keepAvailableNumberHole.holeNumber.value
                    ) ||
                    !used
                ) {
                    acc.push(holeNumber);
                }

                return acc;

            }, []);

            return newState;
        });
    };

    const onSaveHoleHandler = hole => {

        setHoleNumber(state => state + 1);
        onSave(hole);
        determineAvailableStrokeIndices(holes);
        determineAvailableHoleNumbers(holes);
    };

    const onSaveEditHoleHandler = hole => {

        onSaveEdit(hole);
        setEditHole();
        determineAvailableStrokeIndices(holes);
        determineAvailableHoleNumbers(holes);
    };

    const editHoleHandler = idx => {

        setEditHole(holes[idx]);
    };

    const onDeleteHoleHandler = (hole) => {

        onDelete(hole);
        setEditHole();
        determineAvailableStrokeIndices(holes);
        determineAvailableHoleNumbers(holes);
    };

    return (
        <>
            <HoleForm
                hole={ editHole }
                onSave={ onSaveHoleHandler }
                onEdit={ onSaveEditHoleHandler }
                onDelete={ onDeleteHoleHandler }
                holeNumber={ holeNumber }
                availableStrokeIndices={ availableStrokeIndices }
                availableHoleNumbers={ availableHoleNumbers }
                actionLabel={ editHole ? 'save hole' : 'add hole' }/>
            <HoleTable
                holes={ holes }
                onEditHole={ editHoleHandler }
                listTitle={ listTitle }/>
        </>
    );
};

export default ManageHoles;

