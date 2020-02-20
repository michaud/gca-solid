import React from 'react';

import Button from '@material-ui/core/Button';
import MarkerSelector from '@golf/GolfPage/children/game/MarkerSelector';

import formStyles from '@golfstyles/form.style';

const SelectMarker = ({
    markers = [],
    selected,
    onChange,
    onAdd
}) => {

    const classes = formStyles();

    const hasMarkers = markers.length > 0;

    const addHandler = () => {
        onAdd();
    };

    const displayFields = [];

    if(hasMarkers) {

        displayFields.push(<MarkerSelector
            key={ 0 }
            markers={ markers }
            selected={ selected }
            onSelect={ onChange }/>)
    }

    displayFields.push(<Button key={ displayFields.length }
        variant="contained"
        onClick={ addHandler }
        className={ classes.button }
        color="primary">Add Marker</Button>)

    return (
        <div className="c-box" style={{ minHeight: '19.687rem' }}>{ displayFields }</div>
    );
};

export default SelectMarker;
