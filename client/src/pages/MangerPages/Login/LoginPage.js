import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

/* @Actions */
import { loginActions } from '../../../store/actions/auth';
import { setManagerInfoActions } from '../../../store/actions/manager';

/* @Components */
import LoginComponent from '../../../components/Login';

const LoginPage = ({ login, setManagerInfo, userId }) => {
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (values) => {
    try {
      const manager = await login(values);
      console.log(manager);

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

const props = (state) => ({
  userId: state.user.id,
  isAdmin: state.user.isAdmin,
});

const actions = {
  login: loginActions,
  setManagerInfo: setManagerInfoActions,
};

export default connect(props, actions)(LoginPage);
