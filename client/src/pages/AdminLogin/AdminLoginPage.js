import React, { useState } from 'react';
import { connect } from 'react-redux';


import { loginActions } from '../../store/actions/auth';

import LoginComponent from '../../components/Login';

const AdminLoginPage = ({ login }) => {
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (values) => {
    try {
      const { username, companyName } = await login(values);
      setServerError('');
    } catch (error) {
      setServerError(error.message);
    }
  };

  return <LoginComponent onSubmit={handleSubmit} serverError={serverError}  />;
};

const mapStateToProps = () => {};

const mapDispatchToProps = {
  login: loginActions,
};

export default connect(null, mapDispatchToProps)(AdminLoginPage);
