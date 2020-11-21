import React from 'react';
import { connect } from 'react-redux';

import { loginActions } from '../../store/actions/auth';

import LoginComponent from '../../components/Login';

const AdminLoginPage = ({ login }) => {
  const handleSuccess = async (values) => {
    try {
      const { username, companyName } = await login(values);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return <LoginComponent onSuccess={handleSuccess} onFailed={handleFailed} />;
};

const mapStateToProps = () => {};

const mapDispatchToProps = {
  login: loginActions,
};

export default connect(null, mapDispatchToProps)(AdminLoginPage);
