import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import golf from "@golfconstants/golf-namespace";

import ManageHoles from "@golfpagectrl/hole/ManageHoles";
import ClubTypeSelector from '@golfpagectrl/club/ClubTypeSelector';
import DateTimeSelector from '@golfpagectrl/game/DateTimeSelector';
import BagDetail from '@golfpagectrl/game/BagDetail';
import PlayerUpdate from '@golfpagectrl/game/PlayerUpdate';
import SelectMarker from '@golfpagectrl/game/SelectMarker';
import PlayingHandicapDetail from '@golfpagectrl/game/PlayingHandicapDetail';
import SelectCourse from '@golfpagectrl/game/SelectCourse';

import { FlexContainer } from '@golfstyles/layout.style';

const getFieldControl = ({
    data,
    label,
    styles,
    onChange,
    idx,
    ...rest
}) => {

    const required = data.hasOwnProperty('required') ? data.required : true;

    switch(data.type) {

        case golf.types.string : {

            return <TextField key={ idx }
                required={ required }
                label={ data.label }
                className={ styles.textField }
                value={ data.value || '' }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.text : {

            return <TextField key={ idx }
                required={ required }
                label={ data.label }
                className={ styles.textField }
                value={ data.value || '' }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.integer : {

            const value = typeof(data.value) !== 'number' || isNaN(data.value)  ? '' : data.value;

            return <TextField key={ idx }
                required
                type="number"
                label={ data.label }
                value={ value }
                className={ styles.textField }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.nonNegativeInteger : {

            if(data.predicate === 'holeStrokeIndex') {

                const {
                    inputRef,
                    availableStrokeIndices
                } = rest;

                return <div style={{ position: 'relative'}}><FormControl required variant="outlined" className={ styles.SIselect } key={ idx }>
                    <InputLabel shrink id="holeStrokeIndexLabel">{ data.label }</InputLabel>
                    <Select
                        labelId="holeStrokeIndex"
                        label={ data.label }
                        inputRef={ inputRef }
                        value={ availableStrokeIndices.includes(data.value) ? data.value.toString() : '' }
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
                </FormControl></div>;
            }

            if(data.predicate === 'holeNumber') {

                const {
                    availableHoleNumbers
                } = rest;

                return <FormControl required variant="outlined" className={ styles.SIselect } key={ idx }>
                    <InputLabel shrink id="holeNumberLabel">{ data.label }</InputLabel>
                    <Select
                        labelId="holeStrokeIndex"
                        label={ data.label }
                        value={ availableHoleNumbers.includes(data.value) ? data.value.toString() : '' }
                        onChange={ onChange(data) }>
                        {
                            availableHoleNumbers
                                .map((holeNumber, idx) => <MenuItem
                                    key={ idx }
                                    value={ holeNumber }>
                                        { holeNumber }
                                    </MenuItem>)
                        }
                    </Select>
                </FormControl>;
            }

            if(data.predicate === 'gameMarkerStrokeCount') {

                const strokes = [1,2,3,4,5,6,7,8,9,10]

                return (
                    <div key={ idx } style={{ padding: '0 1rem 1rem 1rem' }}>
                        <FlexContainer alignitems="center">
                            <div style={{ flex: 1, textAlign: 'right', paddingRight: '1rem' }}>{ data.label }</div>
                            <FormControl
                                required
                                variant="outlined"
                                style={{ margin: 0 }}
                                className={ styles.markerScoreSelect }
                                key={ idx }>
                                <Select
                                    labelId="holeStrokeIndex"
                                    label={ data.label }
                                    value={ parseInt(data.value) > 0 ? parseInt(data.value) : '' }
                                    onChange={ onChange(data) }>
                                    {
                                        strokes
                                            .map((SI, idx) => <MenuItem
                                                key={ idx }
                                                value={ SI }>
                                                    { SI }
                                                </MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </FlexContainer>
                    </div>
                )
            }

            return <TextField key={ idx }
                required={ required }
                type="number"
                label={ data.label }
                className={ styles.textFieldNumber }
                value={ data.value || '' }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case golf.types.dateTime : {

            return <DateTimeSelector key={ idx }
                onChange={ onChange(data) }/>
        }

        case golf.classes.Player : {

            const {
                onSave,
                dataSource
            } = rest;

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

            const {
                onSave,
                onSaveEdit,
                onDeleteHole,
            } = rest;

            return <ManageHoles
                onSave={ onSave }
                onSaveEdit={ onSaveEdit }
                onDelete={ onDeleteHole }
                key={ idx }
                holes={ data.value }/>
        }

        case golf.classes.Course : {

            const {
                onAdd,
                dataSource
            } = rest;

            return <SelectCourse key={ idx }
                selected={ data.value === '' ? undefined : data.value }
                courses={ dataSource.courses }
                onChange={ onChange(data) }
                onAdd={ onAdd }/>
        }

        case golf.classes.Marker : {

            const {
                onSave,
                onAdd,
                dataSource
            } = rest;

            return <SelectMarker key={ idx }
                markers={ dataSource.markers }
                selected={ data.value === '' ? undefined : data.value }
                onSave={ onSave }
                onAdd={ onAdd }
                onChange={ onChange(data) }/>
        }
            
        case golf.classes.Bag : {

            const { onEdit } = rest;

            return <BagDetail key={ idx }
                bag={ data.value }
                onEdit={ onEdit }/>
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
