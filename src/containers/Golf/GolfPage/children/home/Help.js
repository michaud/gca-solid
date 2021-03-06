import React, { useState } from 'react';

import { ButtonBase } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

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

const Help = () => {

    const [open, setOpen] = useState(false)
    const btnClasses = useStyles();

    const clickHandler = () => setOpen(state => !state);

    return (
        <IntroPanel onClick={ clickHandler }
            icon={ <EmojiPeopleIcon className="c-content-icon plain" /> }>
            <ButtonBase onClick={ clickHandler } disableRipple focusRipple={ false } className={ btnClasses.root }>
                <FlexContainer alignitems="center" flex="1">
                    <FlexItem className="intro-summary">
                        <h3 className="h-intro">How does this Work?</h3>
                        <p>Wat?</p>
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
                            <h1>Golf Course Assistant</h1>
                            <p>GCA helps you keep track of what happened on the course</p>
                            <ul>
                                <li>Keep score while you are playing</li>
                                <li>Register the location of a stroke</li>
                                <li>What club you use for the stroke</li>
                                <li>Store your data on your POD</li>
                            </ul>
                            <h2>The works</h2>
                            <p>Golf Course Assistant is an application without a database. 
                                It is a front-end application that you point to your <a href="https://solid.community/" title="solid.community POD provider">Solid Pod</a> where 
                                it saves the data you generate.<br/>
                                The app uses an <a href="https://en.wikipedia.org/wiki/RDF_Schema" title="wikipedia r.d.f. schema description">rdf schema / vocabulary</a> to 
                                describe the data and the <a href="https://github.com/solid/solid-spec" title="Solid specification on Github">Solid application/data protocol</a> to
                                 read &amp; write the data to a Solid POD.</p>
                            <p>
                                It is tested on an Inrupt Solid POD and a solid.community POD and the application works fine on those two. 
                                The idea is that it should work on any POD provider that conforms to the <a 
                                href="https://github.com/solid/solid-spec" title="Solid specification on Github">Solid specification</a>
                            </p>
                            <h2>Why the POD</h2>
                            <p>You own your data right?
                                This app is only the interpreter and editor of your data.
                            No data is save anywhere else than on your POD.</p>
                            <h2>Players &amp; Markers</h2>
                            <p>Save your own info and register the people you play with.</p>
                            <h2>Bag</h2>
                            <p>List your clubs and fill your bag.</p>
                            <p>The bag list will be used when you create a new game.</p>
                            <h2>Courses</h2>
                            <p>Enter the course you are going to play.</p>
                            <p>You can delete holes by selecting the hole in the hole table (green button).</p>
                            <p>Don't worry, if you delete a hole inbetween other holes, 
                                just add a new hole with the right hole number. The app will sort the holes.</p>
                            <h2>Games</h2>
                            <p>Now you've got your marker, your bag and the course you're going to play, create a game:</p>
                            <ul>
                                <li>Select the course</li>
                                <li>Update your handicap if you want</li>
                                <li>Change the clubs in your bag</li>
                                <li>Dont forget to enter the playing handicap so we can calculate
                          your stableford score!</li>
                                <li>Select the start time of your game</li>
                                <li>The suggested name of the game will be the course name and the date but you can change it. 
                                    If you change the course or the time you will have to edit it again.</li>
                            </ul>
                            <h2>Use location</h2>
                            <p>If you allow the app to use the location technology of your device, we can save the location 
                                where you registered your stroke. So after you hit the ball you select the club you hit the 
                                stroke with and we will save the location with the stroke.</p>
                            <p>To enable the location technology, open the 'Use Location' panel and switch to allow location. 
                                In most cases the browser will ask you to consent to use the location services: Click Allow. 
                                We will use a cookie to register your consent. If you disable location services in the browser, 
                                this information will be out of sync with your choice. If you want to re-enable location 
                                services reset the consent in your browser settings and flip the switch in the app.</p>
                            <p>Of course, the accuracy of the location data is based on what your device reports to the app, how 
                                close you were to the location of your stroke when you selected the club in the app. The browser 
                                location data is sometimes wildly inacurate.</p>
                        </div>
                    </div> :
                    null
            }
        </IntroPanel>
    );
};

export default Help;
