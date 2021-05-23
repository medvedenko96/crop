import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Component */
import AuthFormComponent from './AuthFormComponent';

/* @Actions */
import { loginManagerActions } from 'store/user/actions';

const propTypes = {
	login: func,
};

const AuthFormContainer = ({ login }) => {
	const [serverError, setServerError] = useState('');
	const intl = useIntl();

	const handleSubmitButtonClick = async (values) => {
		const { isAuth, message = '' } = await login(values);
		!isAuth && setServerError(message && intl.formatMessage({ id: message }));
	};

	return (
		<AuthFormComponent
			intl={intl}
			onSubmitButtonClick={handleSubmitButtonClick}
			serverError={serverError}
		/>
	);
};

AuthFormContainer.propTypes = propTypes;

AuthFormContainer.displayName = 'AuthFormContainer';

const mapDispatchToProps = {
	login: loginManagerActions,
};

export default connect(null, mapDispatchToProps)(AuthFormContainer);
