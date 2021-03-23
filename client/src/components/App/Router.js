import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/* @Components */
import PrivateRoute from '../PrivateRoute';
import MangerLogin from '../../pages/MangerPages/Login';

/* @Pages */
import Dashboard from '../../pages/MangerPages/Dashboard';
import NotFound from '../../pages/CommonPages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exect path="/manager" render={(props) => <MangerLogin {...props} />} />
        <PrivateRoute
          exect
          path="/dashboard/:companyId?/:regionId?/:fieldId?"
          render={(props) => <Dashboard {...props} />}
        />
        <Route render={(props) => <NotFound {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
