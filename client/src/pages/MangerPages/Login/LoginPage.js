import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/* @Components */
import LoginForm from '../../../components/LoginForm';

const propTypes = {
	isAuth: bool,
};

const LoginPage = ({ isAuth }) => {
	if (isAuth) {
		return <Redirect to="/dashboard" />;
	}

	return <LoginForm />;
};

LoginPage.propTypes = propTypes;

LoginPage.displayName = 'LoginPage';

const mapStateToProps = ({ user }) => ({
	isAuth: user.isAuth,
});

export default connect(mapStateToProps, null)(LoginPage);
