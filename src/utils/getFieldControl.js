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
    data,
    label,
    styles,
    onChange,
    onSave,
    onSaveEdit,
    inputRef,
    idx,
    dataSource
}) => {

    const required = data.hasOwnProperty('required') ? data.required : true;

    switch(data.fieldType) {

        case golf.types.string : {

            return <TextField key={ idx }
                required={ required }
                label={ data.field.label }
                className={ styles.textField }
                value={ data.field.value }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.text : {

            return <TextField key={ idx }
                required={ required }
                label={ data.field.label }
                className={ styles.textField }
                value={ data.field.value }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.integer : {
            
            return <TextField key={ idx }
                required
                type="number"
                label={ data.field.label }
                className={ styles.textField }
                value={ data.field.value }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.nonNegativeInteger : {

            if(data.fieldName === 'holeStrokeIndex') {

                return <TextField
                    key={ idx }
                    type="number"
                    required
                    label={ data.field.label }
                    className={ styles.textFieldNumber }
                    inputRef={ inputRef }
                    value={ data.field.value }
                    onChange={ onChange(data) }
                    variant="outlined"/>
            }

            return <TextField key={ idx }
                required={ required }
                type="number"
                label={ data.field.label }
                className={ styles.textFieldNumber }
                value={ data.field.value }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.dateTime : {

            return <DateTimeSelector key={ idx }
                onChange={ onChange(data) }/>
        }

        case golf.classes.Player : {

            return <PlayerUpdate key={ idx }
                onSave={ onSave }
                player={ dataSource.player }/>
        }

        case golf.classes.Club: {

            return <ClubTypeSelector
                key={ idx }
                value={ data.field.value }
                label={ label }
                onChange={ onChange(data) }/>
        }

        case golf.classes.Hole : {

            return <ManageHoles
                onSave={ onSave }
                onSaveEdit={ onSaveEdit }
                key={ idx }
                holes={ data.field.value }/>
        }

        case golf.classes.Course : {

            return <SelectCourse key={ idx }
                courses={ dataSource.courses }
                onChange={ onChange(data) }/>
        }

        case golf.classes.Marker : {

            return <SelectMarker key={ idx }
                markers={ dataSource.markers }
                onSave={ onSave }
                onChange={ onChange(data) }/>
        }
            
        case golf.classes.Bag : {

            return <BagDetail key={ idx }
                bag={ data.field.value }/>
        }

        case golf.classes.GamePlayingHandicap : {
                
            return <EditPlayingHandicap key={ idx }
                handicap={ data.field.value }
                onChange={ onChange(data) }/>
        }

        default: {
        
            return <div key={ idx }>{ data.fieldType }</div>;
        }
    }
};

export default getFieldControl;
