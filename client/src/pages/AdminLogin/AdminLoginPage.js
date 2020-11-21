import React from 'react';

import LoginComponent from '../../components/Login';

const AdminLoginPage = () => {
  const handleSuccess = (values) => {
    console.log('Success:', values);
  };

  const handleFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <LoginComponent onSuccess={handleSuccess} onFailed={handleFailed} />
  );
};

export default AdminLoginPage;
