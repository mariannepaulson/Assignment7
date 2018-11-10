import React from 'react';
import { Route, IndexRoute } from 'react-router';
// import TalentPool from './components/enterTalentPool/enterTalentPool';
import Home from './components/home/homePage';
import Search from './components/searchBar/searchBar';

export default (

    <Route exact path='/' component={Home} />
    <Route path="/search" component={Search} />
    <Route path='*' component={Home} />


);
