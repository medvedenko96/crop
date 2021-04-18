import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* @Components */
import PrivateRoute from 'components/PrivateRoute';

/* @Pages */
import Dashboard from '../../pages/MangerPages/Dashboard';
import NotFound from '../../pages/CommonPages/NotFound';
import MangerLogin from 'pages/MangerPages/Login';
import Field from 'pages/MangerPages/Field';

const Router = () => {
	return (
		<Switch>
			<Route exect path="/manager" render={(props) => <MangerLogin {...props} />} />
			<PrivateRoute
				exect
				path="/dashboard/:companyId?/:regionId?/:fieldId?"
				render={(props) => <Dashboard {...props} />}
			/>
			<PrivateRoute
				exect
				path="/field/:companyId?/:regionId/:fieldId/:yearId?"
				render={(props) => <Field {...props} />}
			/>
			<Route render={(props) => <NotFound {...props} />} />
		</Switch>
	);
};

export default Router;
