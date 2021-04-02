import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Purchase from './pages/Purchase';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function Routes(){
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/purchase" component={Purchase}/>
            <Route path="/login" component={Login}/>
            <Route path="/dashboard" component={Dashboard}/>
        </Switch>
    );
}
