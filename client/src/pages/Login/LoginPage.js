import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginActions } from '../../store/actions/auth';
import { setUserInfoActions } from '../../store/actions/manager';

import LoginComponent from '../../components/Login';

const LoginPage = ({ login, setUserInfo, userId, isAdmin }) => {
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (values) => {
    try {
      const user = await login(values);

      setUserInfo(user);
      setServerError('');
    } catch (error) {
      setServerError(error.message);
    }
  };

  if (userId && isAdmin) {
    return <Redirect to="/dashboard" />;
  }

  return <LoginComponent onSubmit={handleSubmit} serverError={serverError} />;
};

const mapStateToProps = (state) => ({
  userId: state.user.id,
  isAdmin: state.user.isAdmin,
});

const mapDispatchToProps = {
  login: loginActions,
  setUserInfo: setUserInfoActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
