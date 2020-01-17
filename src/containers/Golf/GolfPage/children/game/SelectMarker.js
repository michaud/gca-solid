import React from 'react';

import Button from '@material-ui/core/Button';
import MarkerSelector from './MarkerSelector';

import formStyles from '@styles/form.style';

const SelectMarker = ({ markers = [], onSave, onChange }) => {

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
