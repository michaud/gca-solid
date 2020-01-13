import React from 'react';
import golf from "./golf-namespace";

import TextField from '@material-ui/core/TextField';

import ManageHoles from "@containers/Golf/GolfPage/children/hole/ManageHoles";
import ClubTypeSelector from '@containers/Golf/GolfPage/children/club/ClubTypeSelector';
import DateTimeSelector from '@containers/Golf/GolfPage/children/game/DateTimeSelector';
import BagDetail from '@containers/Golf/GolfPage/children/game/BagDetail';
import PlayerUpdate from '@containers/Golf/GolfPage/children/game/PlayerUpdate';
import SelectMarker from '@containers/Golf/GolfPage/children/game/SelectMarker';
import EditPlayingHandicap from '@containers/Golf/GolfPage/children/game/EditPlayingHandicap';
import SelectCourse from '@containers/Golf/GolfPage/children/game/SelectCourse';

const getFieldControl = ({
    field,
    label,
    styles,
    onChange,
    onSave,
    onSaveEdit,
    inputRef,
    idx,
    data
}) => {

    const required = field.hasOwnProperty('required') ? field.required : true;

    switch(field.fieldType) {

        case golf.types.string : {

            return <TextField key={ idx }
                required={ required }
                label={ field.field.label }
                className={ styles.textField }
                value={ field.field.value }
                onChange={ onChange(field) }
                variant="outlined"/>
        }

        case golf.types.text : {

            return <TextField key={ idx }
                required={ required }
                label={ field.field.label }
                className={ styles.textField }
                value={ field.field.value }
                onChange={ onChange(field) }
                variant="outlined"/>
        }

        case golf.types.integer : {
            
            return <TextField key={ idx }
                required
                type="number"
                label={ field.field.label }
                className={ styles.textField }
                value={ field.field.value }
                onChange={ onChange(field) }
                variant="outlined"/>
        }

        case golf.types.nonNegativeInteger : {

            if(field.fieldName === 'holeStrokeIndex') {

                return <TextField
                    key={ idx }
                    type="number"
                    required
                    label={ field.field.label }
                    className={ styles.textFieldNumber }
                    inputRef={ inputRef }
                    value={ field.field.value }
                    onChange={ onChange(field) }
                    variant="outlined"/>
            }

            return <TextField key={ idx }
                required={ required }
                type="number"
                label={ field.field.label }
                className={ styles.textFieldNumber }
                value={ field.field.value }
                onChange={ onChange(field) }
                variant="outlined"/>
        }

        case golf.types.dateTime : {

            return <DateTimeSelector key={ idx }
                onChange={ onChange(field) }/>
        }

        case golf.classes.Player : {

            return <PlayerUpdate key={ idx }
                onSave={ onSave }
                player={ data.player }/>
        }

        case golf.classes.Club: {

            return <ClubTypeSelector
                key={ idx }
                value={ field.field.value }
                label={ label }
                onChange={ onChange(field) }/>
        }

        case golf.classes.Hole : {

            return <ManageHoles
                onSave={ onSave }
                onSaveEdit={ onSaveEdit }
                key={ idx }
                holes={ field.field.value }/>
        }

        case golf.classes.Course : {

            return <SelectCourse key={ idx }
                courses={ data.courses }
                onChange={ onChange(field) }/>
        }

        case golf.classes.Marker : {

            return <SelectMarker key={ idx }
                markers={ data.markers }
                onSave={ onSave }
                onChange={ onChange(field) }/>
        }
            
        case golf.classes.Bag : {

            return <BagDetail key={ idx }
                bag={ field.field.value }/>
        }

        case golf.classes.GamePlayingHandicap : {
                
            return <EditPlayingHandicap key={ idx }
                handicap={ field.field.value }
                onChange={ onChange(field) }/>
        }

        default: {
        
            return <div key={ idx }>{ field.fieldType }</div>;
        }
    }
};

export default getFieldControl;
