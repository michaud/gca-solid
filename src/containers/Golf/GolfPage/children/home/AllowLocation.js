import React, { useState, useEffect } from 'react';

import Cookies from 'js-cookie'
import { ButtonBase, Switch, FormControlLabel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationOffIcon from '@material-ui/icons/LocationOff';
import { withStyles } from '@material-ui/core/styles';

import IntroPanel from '@golf/components/IntroPanel';

import { makeStyles } from '@material-ui/core';
import { FlexContainer, FlexItem } from '@golfstyles/layout.style';

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

const IOSSwitch = withStyles(theme => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={ classes.focusVisible }
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

const AllowLocation = () => {

    const [open, setOpen] = useState(false)
    const [canUseLocation, setCanUseLocation] = useState(Cookies.get('canUseLocation') === 'true');
    const [isBlocked, setIsBlocked] = useState(false);

    const btnClasses = useStyles();

    useEffect(() => {

        const can = Cookies.get('canUseLocation') === 'true';

        if(can !== canUseLocation) {

            Cookies.set('canUseLocation', canUseLocation);

        } else {

            if(can) checkConsent();
        }

    }, [canUseLocation])

    const checkConsent = () => {

        const errorHandler = (error) => {
            setCanUseLocation(false);
            if(error.code === 1) setIsBlocked(true);
        };

        const successHandler = (position) => {
            setIsBlocked(false);
            setCanUseLocation(true);
        };
    
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
    
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
    }

    const handleAllowLocationData = (e, value) => {

        if(value) {

            checkConsent();

        } else {

            setCanUseLocation(false);
        }
    }

    const clickHandler = () => setOpen(state => !state);

    return (
        <IntroPanel onClick={ clickHandler }
            icon={ canUseLocation ? <LocationOnIcon className="c-content-icon plain"/> : <LocationOffIcon htmlColor="rgb(238, 124, 43)" className="c-content-icon"/> }>
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
                    <FormControlLabel
                        control={
                        <IOSSwitch
                            checked={ canUseLocation }
                            onChange={ handleAllowLocationData }
                            value="checkedB"/>
                        }
                        label="Allow location data"/>
                    { isBlocked && (
                        <div className="c-box">
                            <p>The browser reported that you have blocked Location data use. You can change this setting in the Settings or in the url bar of your browser.</p>
                        </div>
                    )}
                </div> :
                null
            }
        </IntroPanel>
    );
};

export default AllowLocation;
