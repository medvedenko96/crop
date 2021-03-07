import React from 'react';
import { func, shape, string, number } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import useToken from '../../helpers/useToken';

const propTypes = {
  render: func,
  user: shape({
    id: number,
    login: string,
  }),
};

const PrivateRouteComponent = ({ render: renderPage, user, ...props }) => {
  const { checkToken } = useToken();
  const isAuth = checkToken(user);

  const redirect = ({ location }) => (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );

  return <Route {...props} render={isAuth ? renderPage : redirect} />;
};

PrivateRouteComponent.propTypes = propTypes;

PrivateRouteComponent.defaultProps = {
  user: {
    id: 0,
    login: '',
  },
};
const props = (state) => ({
  user: state.user,
});

export default connect(props, null)(PrivateRouteComponent);
