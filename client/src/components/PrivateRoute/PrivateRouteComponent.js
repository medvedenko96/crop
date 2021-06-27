import React from 'react';
import { func, string, number, bool, object } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/* @Pages */
import NotFound from 'pages/CommonPages/NotFound';

/* @Antd */
import { Spin } from 'antd';

/* @Styles */
import styles from './PrivateRoute.module.css';

const propTypes = {
	render: func,
	intl: object,
	id: number,
	login: string,
	isLoaded: bool,
	isAuth: bool,
	isCompany: bool,
	adminPage: bool,
};

const PrivateRouteComponent = ({
	render: renderPage,
	intl,
	isAuth,
	isLoaded,
	isCompany,
	...props
}) => {
	const redirect = ({ location }) => (
		<Redirect
			to={{
				pathname: '/auth',
				state: { from: location },
			}}
		/>
	);

	if (isLoaded) {
		return (
			<div className={styles.spinWrapper}>
				<Spin tip={intl.formatMessage({ id: 'loading' })} size="large" />
			</div>
		);
	}

	if (isCompany && props.adminPage) {
		return <Route render={(props) => <NotFound {...props} />} />;
	}

	if (!isCompany && !props.adminPage) {
		return <Route {...props} render={redirect} />;
	}

	return <Route {...props} render={isLoaded || isAuth ? renderPage : redirect} />;
};

PrivateRouteComponent.propTypes = propTypes;

export default PrivateRouteComponent;
