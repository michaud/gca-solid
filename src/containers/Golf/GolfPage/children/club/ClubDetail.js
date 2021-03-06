import React, { useState } from "react";

import displayStates from "@golfutils/displayStates";

import EditActions from "@golf/components/EditActions";
import ClubForm  from '@golfpagectrl/club/ClubForm';

import {
    FlexContainer,
    FlexItemData,
    FlexItemTools
} from '@golfstyles/layout.style';

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

    const onDeleteHandler = () => {

        onDelete(club);
    };

    const { clubName, clubBrand, clubType } = club;
    const clubDescription = `${ clubBrand.value }, ${ clubName.value }, ${ clubType.value.label }`;

    return (
        <div className="c-detail__container">
            <FlexContainer alignitems="center">
                <FlexItemData className="summary__content" vertical alignitems="center">
                    <div>{ clubDescription }</div>
                </FlexItemData>
                <FlexItemTools>
                    <EditActions onEdit={ onEdit }/>
                </FlexItemTools>
            </FlexContainer>
            { displayState === displayStates.edit && (
                <div className="c-block--akimbo c-box">
                    <ClubForm
                        club={ club }
                        title=""
                        actionLabel="Save club"
                        onSave={ onSaveHandler }
                        onDelete={ onDeleteHandler }
                        onCancel={ cancelEdit }/>
                </div>
            )}
        </div>
    );
};

export default ClubDetail;
