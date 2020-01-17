import React, { useState } from "react";

import clubShape from '@contexts/club-shape.json';
import ClubTypeContext from "@utils/clubTypeContext";
import golf from "@utils/golf-namespace";

import ClubForm  from './ClubForm';
import displayStates from "@utils/displayStates";
import EditActions from "@containers/Golf/components/EditActions";

import {
    FieldContainer,
    FlexContainer,
    FlexItemData,
    FlexItemLabel,
    FlexItemValue,
    FlexItemTools
} from '@styles/layout.style';

const checkRenderField = field => {

    if(field.prefix === "golf" && field.predicate === 'ownedBy') return false;

    return true;

};

const getFieldData = (field, club, clubType, clubTypes) => {

    const label = clubType.fields[field.predicate].label;

    let value = '';

    switch(field.type) {

        case golf.types.string: {

            value = club.fields[field.predicate].value;

            break;
        }
        
        case golf.classes.Player: {
            
            value = 'me';

            break;
        }

        case golf.classes.Club: {

            value = clubTypes.find(item => item.iri === club.fields.clubType.value.iri).label;

            break;
        }

        default: {
            value = 'error';
            console.error('no field type', field)
        }
    }
    
    return { value, label };
};

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

    return (
        <ClubTypeContext.Consumer>
        {
            clubTypeData => {
        
                const { clubTypes = [], clubType } = clubTypeData;
                const fields = [];

                if(clubTypes.length > 0 && clubType) {

                    clubShape.shape.forEach(field => {
                        
                        const renderField = checkRenderField(field);

                        if(renderField) {

                            const data = getFieldData(field, club, clubType, clubTypes);
                            fields.push(data);
                        }
                    });
                }
                
                if(displayState === displayStates.edit) {

                    return <ClubForm
                        club={ club }
                        onSave={ onSaveHandler }
                        title=""
                        actionLabel="Save club"
                        onCancel={ cancelEdit }/>;
                }

                return <FieldContainer>
                    <FlexContainer>
                        <FlexItemData>
                        {
                            fields.map((field, index) => <FlexContainer key={ index }>
                                <FlexItemLabel>{ field.label }</FlexItemLabel>
                                <FlexItemValue>{ field.value }</FlexItemValue>
                            </FlexContainer>)
                        }
                        </FlexItemData>
                        <FlexItemTools>
                            <EditActions onEdit={ onEdit } onDelete={ onDeleteHandler }/>
                        </FlexItemTools>
                    </FlexContainer>
                </FieldContainer>;
            }
        }
        </ClubTypeContext.Consumer>
    );
};

export default ClubDetail;
