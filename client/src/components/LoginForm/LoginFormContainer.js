import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Component */
import LoginFormComponent from './LoginFormComponent';

/* @Actions */
import { loginManagerActions } from '../../store/manager/actions';

const propTypes = {
    login: func
};

const LoginFormContainer = ({ login }) => {
    const [serverError, setServerError] = useState('');
    const intl = useIntl();

    const handleSubmitButtonClick = async (values) => {
        const { isAuth = false, massage = '' } = await login(values);
        isAuth && setServerError(massage);
    };

    return (
        <LoginFormComponent
            onSubmitButtonClick={handleSubmitButtonClick}
            serverError={serverError}
            intl={intl}
        />
    );
};

LoginFormContainer.propTypes = propTypes;

LoginFormContainer.displayName = 'LoginFormContainer';

const mapDispatchToProps = {
    login: loginManagerActions
};

export default connect(null, mapDispatchToProps)(LoginFormContainer);
