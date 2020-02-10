import React from 'react';

import Button from '@material-ui/core/Button';
import MarkerSelector from '@containers/Golf/GolfPage/children/game/MarkerSelector';

import formStyles from '@golfstyles/form.style';

const SelectMarker = ({
    markers = [],
    onChange
}) => {

    const classes = formStyles();

    const hasMarkers = markers.length > 0;

    const saveHandler = () => {

    };

    const displayFields = [];

    if(hasMarkers) {

        displayFields.push(<MarkerSelector
            key={ 0 }
            markers={ markers }
            onSelect={ onChange }/>)
    }

    displayFields.push(<Button key={ displayFields.length }
        variant="contained"
        onClick={ saveHandler }
        className={ classes.button }
        color="primary">Add Marker</Button>)

    return (
        <div className="c-box">{ displayFields }</div>
    );
};

export default SelectMarker;
