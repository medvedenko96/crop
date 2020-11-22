import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


import { loginActions } from '../../store/actions/auth';
import { setUserInfoActions } from '../../store/actions/user';

import LoginComponent from '../../components/Login';

const AdminLoginPage = ({ login, setUserInfo, userId, isAdmin }) => {
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

  if (userId) {
    return  isAdmin ? <Redirect to="/dashboard" /> : <Redirect to="/dashboard" />
  }

  return <LoginComponent onSubmit={handleSubmit} serverError={serverError}  />;
};

const mapStateToProps = state => ({
  userId: state.user.id,
  isAdmin: state.user.isAdmin
});

const mapDispatchToProps = {
  login: loginActions,
  setUserInfo: setUserInfoActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginPage);
