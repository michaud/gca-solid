import React, { Fragment } from 'react';

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import {
  PrivateLayout,
  PublicLayout,
  NotLoggedInLayout
} from '@layouts';


import {
  Login,
  Register,
  PageNotFound,
  Welcome,
  RegistrationSuccess,
  Profile,
  GolfPage
} from './containers';

const privateRoutes = [
  {
    id: 'welcome',
    path: '/welcome',
    component: Welcome
  },
  {
    id: 'profile',
    path: '/profile',
    component: Profile
  },
  {
    id: 'golf',
    path: '/golf',
    component: GolfPage
  },
  {
    id: 'golf',
    path: '/golf/settings',
    component: GolfPage
  },
    {
    id: 'golf',
    path: '/golf/settings/bag',
    component: GolfPage
  },
  {
    id: 'golf',
    path: '/golf/settings/courses',
    component: GolfPage
  },
  {
    id: 'golf',
    path: '/golf/settings/players',
    component: GolfPage
  },
  {
    id: 'golf',
    path: '/golf/game/:gameid',
    component: GolfPage
  },
  {
    id: 'golf',
    path: '/golf/settings/games',
    component: GolfPage
  },
  {
    id: 'golf',
    path: '/golf/settings/games/new',
    component: GolfPage
  }
];

const Routes = () => {

  return (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={ Login } path="/login" exact/>
        <NotLoggedInLayout component={ Register } path="/register" exact />
        <NotLoggedInLayout path="/register/success" component={ RegistrationSuccess } exact/>
        <PublicLayout path="/404" component={ PageNotFound } exact/>
        <Redirect from="/" to="/welcome" exact/>
        <PrivateLayout path="/" routes={ privateRoutes }/>
        <Redirect to="/404"/>
      </Switch>
    </Fragment>
  </Router>
)};

export default Routes;
