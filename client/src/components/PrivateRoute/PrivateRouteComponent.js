import React from 'react';
import { func, string, number, bool } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const propTypes = {
  render: func,
  id: number,
  login: string,
  isLoaded: bool,
};

const PrivateRouteComponent = ({ render: renderPage, isAuth, isLoaded, ...props }) => {
  const redirect = ({ location }) => (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );

  return <Route {...props} render={isLoaded || isAuth ? renderPage : redirect} />;
};

PrivateRouteComponent.propTypes = propTypes;

export default PrivateRouteComponent;
