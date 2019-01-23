import React from 'react';
import Dashboard from '../Components/Dashboard'
import Authentication from '../Screens/Auth'
import Error from '../Components/Error/'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' component={Authentication} exact />
            <Route path='/Home' component={Dashboard} />
            <Route component={Error} />
        </Switch>
    </BrowserRouter>

);

export default Routes;