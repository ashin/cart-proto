import React from 'react';
import { Route } from 'react-router';
import App from './components/App/App';

export default (
    <Route name="app" path="/(:filter)" component={App}></Route>
);
