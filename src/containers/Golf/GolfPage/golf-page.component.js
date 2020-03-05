import React from 'react';

import { Route } from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';

import { AppDataProvider } from '@golfcontexts/dataProvider/AppDataProvider';

import GolfApp from '@golfpagectrl/GolfApp';

import '@golfcssstyles/_style.scss';

const GolfPage = (props) => {

    return (
        <StylesProvider>
            <AppDataProvider>
                <Route
                    path="/golf"
                    render={ routerProps => <GolfApp { ...routerProps }/> } />
            </AppDataProvider>
        </StylesProvider>
    );
};

export default GolfPage;
