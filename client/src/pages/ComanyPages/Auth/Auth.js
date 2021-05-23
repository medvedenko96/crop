import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/* @Components */
import LoginForm from './submodals/AuthForm';

const propTypes = {
	isAuth: bool,
};

const Auth = ({ isAuth }) => {
	if (isAuth) {
		return <Redirect to="/" />;
	}

	return <LoginForm />;
};

Auth.propTypes = propTypes;

Auth.displayName = 'Auth';

const mapStateToProps = ({ user }) => ({
	isAuth: user.isAuth,
});

export default connect(mapStateToProps, null)(Auth);
