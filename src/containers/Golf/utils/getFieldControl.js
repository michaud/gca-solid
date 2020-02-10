import React from 'react';
import golf from "@golfutils/golf-namespace";

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import ManageHoles from "@containers/Golf/GolfPage/children/hole/ManageHoles";
import ClubTypeSelector from '@containers/Golf/GolfPage/children/club/ClubTypeSelector';
import DateTimeSelector from '@containers/Golf/GolfPage/children/game/DateTimeSelector';
import BagDetail from '@containers/Golf/GolfPage/children/game/BagDetail';
import PlayerUpdate from '@containers/Golf/GolfPage/children/game/PlayerUpdate';
import SelectMarker from '@containers/Golf/GolfPage/children/game/SelectMarker';
import PlayingHandicapDetail from '@containers/Golf/GolfPage/children/game/PlayingHandicapDetail';
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
    dataSource,
    availableStrokeIndices
}) => {

    const required = data.hasOwnProperty('required') ? data.required : true;

    switch(data.type) {

        case golf.types.string : {

            return <TextField key={ idx }
                required={ required }
                label={ data.label }
                className={ styles.textField }
                value={ data.value }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.text : {

            return <TextField key={ idx }
                required={ required }
                label={ data.label }
                className={ styles.textField }
                value={ data.value }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.integer : {
            
            return <TextField key={ idx }
                required
                type="number"
                label={ data.label }
                className={ styles.textField }
                value={ data.value }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.nonNegativeInteger : {

            if(data.predicate === 'holeStrokeIndex') {

                return <FormControl required variant="outlined" className={ styles.SIselect } key={ idx }>
                    <InputLabel shrink id="holeStrokeIndexLabel">{ data.label }</InputLabel>
                    <Select
                        labelId="holeStrokeIndex"
                        label={ data.label }
                        inputRef={ inputRef }
                        value={ parseInt(data.value) > 0 ? parseInt(data.value) : '' }
                        onChange={ onChange(data) }>
                        {
                            availableStrokeIndices
                                .map((SI, idx) => <MenuItem
                                    key={ idx }
                                    value={ SI }>
                                        { SI }
                                    </MenuItem>)
                        }
                    </Select>
                </FormControl>;
            }

            return <TextField key={ idx }
                required={ required }
                type="number"
                label={ data.label }
                className={ styles.textFieldNumber }
                value={ data.value }
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
                value={ data.value }
                label={ label }
                onChange={ onChange(data) }/>
        }

        case golf.classes.Hole : {

            return <ManageHoles
                onSave={ onSave }
                onSaveEdit={ onSaveEdit }
                key={ idx }
                holes={ data.value }/>
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
                bag={ data.value }/>
        }

        case golf.classes.GamePlayingHandicap : {
                
            return <PlayingHandicapDetail key={ idx }
                handicap={ data.value }
                onChange={ onChange(data) }/>
        }

        default: {

            console.error('data:', data);

            return null;
        }
    }
};

export default getFieldControl;
