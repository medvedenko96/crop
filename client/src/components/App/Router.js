import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* @Components */
import PrivateRoute from 'components/PrivateRoute';

/* @Pages */
import Dashboard from 'pages/MangerPages/Dashboard';
import NotFound from 'pages/CommonPages/NotFound';
import MangerLogin from 'pages/MangerPages/Auth';
import Auth from 'pages/ComanyPages/Auth';
import CompanyDashboard from 'pages/ComanyPages/Dashboard';
import Field from 'pages/MangerPages/Field';

const Router = () => {
	return (
		<Switch>
			<Route exect path="/admin" render={(props) => <MangerLogin {...props} />} />
			<Route exect path="/auth" render={(props) => <Auth {...props} />} />
			<PrivateRoute
				exect
				adminPage
				path="/dashboard/:companyId?/:regionId?/:fieldId?"
				render={(props) => <Dashboard {...props} />}
			/>
			<PrivateRoute
				exect
				adminPage
				path="/field/:companyId?/:regionId/:fieldId/:yearId?"
				render={(props) => <Field {...props} />}
			/>
			<PrivateRoute exect path="/" render={(props) => <CompanyDashboard {...props} />} />
			<Route render={(props) => <NotFound {...props} />} />
		</Switch>
	);
};

export default Router;
