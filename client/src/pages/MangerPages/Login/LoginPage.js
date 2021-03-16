import React, { useState } from 'react';
import { number, func } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/* @Actions */
import { loginManagerActions } from '../../../store/actions/auth';
import { setManagerInfoActions } from '../../../store/actions/manager';

/* @Components */
import LoginComponent from '../../../components/Login';

const propTypes = {
  login: func,
  setManagerInfo: func,
  userId: number,
};

const LoginPage = ({ login, setManagerInfo, userId }) => {
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (values) => {
    try {
      const manager = await login(values);

      setManagerInfo(manager);
      setServerError('');
    } catch (error) {
      setServerError(error.message);
    }
  };

  if (userId) {
    return <Redirect to="/dashboard" />;
  }

  return <LoginComponent onSubmit={handleSubmit} serverError={serverError} />;
};

LoginPage.propTypes = propTypes;

LoginPage.displayName = 'LoginPage';

const mapStateToProps = (state) => ({
  userId: state.user.id,
});

const mapDispatchToProps = {
  login: loginManagerActions,
  setManagerInfo: setManagerInfoActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
