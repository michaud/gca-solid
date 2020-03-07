import React, { useState } from 'react';

import { ButtonBase } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import IntroPanel from '@golf/components/IntroPanel';

import { makeStyles } from '@material-ui/core';
import { FlexContainer, FlexItem } from '@golfstyles/layout.style';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
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

const About = () => {

    const [open, setOpen] = useState(false)
    const btnClasses = useStyles();

    const clickHandler = () => setOpen(state => !state);

    return (
        <IntroPanel onClick={ clickHandler }
            icon={ <ChildCareIcon className="c-content-icon plain" /> }>
            <ButtonBase onClick={ clickHandler } disableRipple focusRipple={ false } className={ btnClasses.root }>
                <FlexContainer alignitems="center" flex="1">
                    <FlexItem className="intro-summary">
                        <h3 className="h-intro">About</h3>
                        <p>Who done this?</p>
                    </FlexItem>
                    <FlexItem narrow>
                        {
                            open ?
                                <ExpandLessIcon fontSize="large" className="action-intro" /> :
                                <ExpandMoreIcon fontSize="large" className="action-intro" />
                        }
                    </FlexItem>
                </FlexContainer>
            </ButtonBase>
            {
                open ?
                    <div className="c-box c-box--belly">
                        <div className="c-box content">
                            <h1>Me</h1>
                            <p><a href="https://michaud.inrupt.net/">michaud</a> built this.
                            It is an exploration of <a href="https://solidproject.org/">Solid</a> using 
                            the <a href="https://inrupt.com/sdk">SDK</a> by <a href="https://inrupt.com">Inrupt</a>.</p>
                            <p>What I used:</p>
                            <ul>
                                <li>Started with <a href="https://github.com/inrupt/generator-solid-react">inrupt / generator-solid-react</a> for generating the application framework</li>
                                <li><a href="https://vincenttunru.gitlab.io/tripledoc/">Tripledoc</a> for the data interaction with the POD</li>
                                <li><a href="https://reactjs.org/">React</a> to build the complete UI</li>
                                <li><a href="https://solid.community">solid.community</a> and <a href="https://inrupt.net/">inrupt.net</a> where I endlessly reloaded for testing</li>
                                <li><a href="https://material-ui.com/">material-ui</a> for the Form components, icons, pop-ups and more</li>
                                <li><a href="https://github.com/michaud/gca-solid/">Github</a> for hosting the code</li>
                                <li><a href="https://code.visualstudio.com/">VScode</a> an absolute work horse</li>
                                <li><a href="https://www.lipton.com/be/nl/onze-producten/lipton-zwarte-thee-earl-grey-25-theezakjes.html">Earl grey Tea, but that might change</a></li>
                                <li><a href="https://forum.solidproject.org/">the Solid Community Forum</a></li>
                                <li><a href="https://solid.inrupt.com/docs/">Inrupt Solid docs</a></li>
                                <li><a href="https://ruben.verborgh.org/blog/2018/12/28/designing-a-linked-data-developer-experience/">Ruben's article</a></li>
                            </ul>
                            <p>Currently hosted @ <a href="https://gca-solid.now.sh/">https://gca-solid.now.sh</a> by <a href="https://zeit.co/home">ZEIT</a> using <a href="https://zeit.co/github">ZEIT Now for GitHub</a></p>
                        </div>
                    </div> :
                    null
            }
        </IntroPanel>
    );
};

export default About;
