import React from 'react';

import { Route } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';

import GolfApp from '@golf/GolfPage/children/GolfApp';

import './../scss/_style.scss';
import { AppDataProvider } from '../contexts/dataProvider/AppDataProvider';

const GolfPage = ({
    webId
}) => {

    return (
        <StylesProvider>
            <AppDataProvider>
                <Route
                    path="/golf"
                    render={ routerProps => <GolfApp { ...routerProps } webId={ webId } /> } />
            </AppDataProvider>
        </StylesProvider>
    );
};

export default GolfPage;
