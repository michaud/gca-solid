import React, { useState } from 'react';

import { Button, ButtonBase } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LocationIcon from '@material-ui/icons/LocationOn';
import IntroPanel from '@containers/Golf/components/IntroPanel';

import { makeStyles } from '@material-ui/core';
import { FlexContainer, FlexItem } from '@golfstyles/layout.style';
import formStyles from '@golfstyles/form.style';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minWidth: 300,
        width: '100%',
        alignItems: 'stretch',
        textAlign: 'unset',
        '&:active': {
        background: 'transparent',
        borderColor: 'transparent',
        borderRadius: '5px'
      }
    }
}));


const AllowLocation = () => {

    const [open, setOpen] = useState(false)

    const classes = formStyles();
    const btnClasses = useStyles();

    const handleAllowLocationData = () => {

        const errorHandler = (error) => {

            console.log('error: ', error);
        };

        const successHandler = (position) => {

            console.log('position: ', position);
        };
        
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
    
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
    }

    const clickHandler = () => setOpen(state => !state);

    return (
        <IntroPanel onClick={ clickHandler }
            icon={ <LocationIcon className="c-content-icon"/> }>
            <ButtonBase onClick={ clickHandler } disableRipple focusRipple={ false} className={ btnClasses.root }>
                <FlexContainer alignitems="center" flex="1">
                    <FlexItem>
                        <h3 className="h-intro">Use location</h3>
                        <p>Where?</p>
                    </FlexItem>
                    <FlexItem narrow>
                        {
                            open ?
                                <ExpandLessIcon fontSize="large" className="action-intro"/> :
                                <ExpandMoreIcon fontSize="large" className="action-intro"/>
                        }
                    </FlexItem>
                </FlexContainer>
            </ButtonBase>
            {
                open ?
                <div className="c-box">
                    <div className="c-box">
                        <p>When playing on the course You can save the location of a stroke. The app needs your consent to retrieve that data from the browser.</p>
                        <p>The data will be saved in your solid pod and not anywhere else!</p>
                        <p>Click on 'Allow Location data' and the browser will ask to allow Location data.</p>
                    </div>
                    <Button
                        variant="outlined"
                        size="small"
                        className={ classes.button }
                        onClick={ handleAllowLocationData }
                        aria-label="move selected right">Allow Location data</Button>
                </div> :
                null
            }
        </IntroPanel>
    );
};

export default AllowLocation;
