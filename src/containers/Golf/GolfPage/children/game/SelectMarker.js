import React from 'react';

import Button from '@material-ui/core/Button';
import MarkerSelector from './MarkerSelector';

import formStyles from '@styles/form.style';

const SelectMarker = ({ markers = [], onSave, onChange }) => {

    const classes = formStyles();

    const hasMarkers = markers.length > 0;

    const saveHandler = () => {

    };

    const fields = [];

    if(hasMarkers) {

        fields.push(<MarkerSelector
            key={ 0 }
            markers={ markers }
            onSelect={ onChange }/>)
    }

    fields.push(<Button key={ fields.length }
        variant="contained"
        onClick={ saveHandler }
        className={ classes.button }
        color="primary">Add Marker</Button>)

    return (
        <div className="c-box">{ fields }</div>
    );
};

export default SelectMarker;
