import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/* @Components */
import LoginForm from './submodals/AuthForm';
import Logo from 'static/images/logo.png';

/* @Styles */
import styles from './Auth.module.css';

const propTypes = {
	isAuth: bool,
};

const Auth = ({ isAuth }) => {
	if (isAuth) {
		return <Redirect to="/" />;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.logoWrapper}>
				<img className={styles.logo} src={Logo} alt="Logo" />
			</div>
			<LoginForm />
		</div>
	);
};

Auth.propTypes = propTypes;

Auth.displayName = 'Auth';

const mapStateToProps = ({ user }) => ({
	isAuth: user.isAuth,
});

export default connect(mapStateToProps, null)(Auth);
