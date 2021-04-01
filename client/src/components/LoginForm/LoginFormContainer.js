import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Component */
import LoginFormComponent from './LoginFormComponent';

/* @Actions */
import { loginManagerActions } from '../../store/manager/actions';

const propTypes = {
	login: func,
};

const LoginFormContainer = ({ login }) => {
	const [serverError, setServerError] = useState('');
	const intl = useIntl();

	const handleSubmitButtonClick = async (values) => {
		const { isAuth, message = '' } = await login(values);
		!!isAuth && setServerError(message && intl.formatMessage({ id: message }));
	};

	return (
		<LoginFormComponent
			intl={intl}
			onSubmitButtonClick={handleSubmitButtonClick}
			serverError={serverError}
		/>
	);
};

LoginFormContainer.propTypes = propTypes;

LoginFormContainer.displayName = 'LoginFormContainer';

const mapDispatchToProps = {
	login: loginManagerActions,
};

export default connect(null, mapDispatchToProps)(LoginFormContainer);
