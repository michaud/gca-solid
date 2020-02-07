import React from 'react';

import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
    return <MuiAlert elevation={ 6 } { ...props } />;
}

export default Alert;
