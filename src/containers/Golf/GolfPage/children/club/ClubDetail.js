import React, { useState } from "react";

import ClubForm  from './ClubForm';
import displayStates from "@utils/displayStates";
import EditActions from "@containers/Golf/components/EditActions";

import {
    FlexContainer,
    FlexItemData,
    FlexItemTools
} from '@styles/layout.style';

const ClubDetail = ({
    club,
    onSave,
    onDelete
}) => {

    const [displayState, setDisplayState] = useState(displayStates.detail);

    const onEdit = () => {

        setDisplayState(displayStates.edit);
    }

    const cancelEdit = () => {

        setDisplayState(displayStates.detail);
    };

    const onSaveHandler = club => {

        onSave(club);

        setDisplayState(displayStates.detail);
    };

    // const onDeleteHandler = () => {

    //     onDelete(club);
    // };

    const { clubName, clubBrand, clubType } = club;
    const clubDescription = `${ clubBrand.value }, ${ clubName.value }, ${ clubType.value.label }`;

    return <div className="c-detail__container">
        <FlexContainer alignitems="center">
            <FlexItemData vertical alignitems="center">
                <div>{ clubDescription }</div>
            </FlexItemData>
            <FlexItemTools>
                <EditActions onEdit={ onEdit }/>
            </FlexItemTools>
        </FlexContainer>
        { displayState === displayStates.edit && (

            <ClubForm
                club={ club }
                onSave={ onSaveHandler }
                title=""
                actionLabel="Save club"
                onCancel={ cancelEdit }/>
        )}
    </div>;
};

export default ClubDetail;
