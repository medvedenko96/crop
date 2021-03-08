import React, { useEffect } from 'react';
import { func, number, string, bool } from 'prop-types';
import { connect } from 'react-redux';

/* @Actions */
import { getManagerInfoActions } from '../../store/actions/manager';

/* @Component */
import PrivateRouteComponent from './PrivateRouteComponent';

/* @Helpers */
import useToken from '../../helpers/useToken';

const propTypes = {
  id: number,
  login: string,
  isManagerInfoLoaded: bool,
  getManagerInfoActions: func,
};

const PrivateRouteContainer = ({ id, login, isManagerInfoLoaded, getManagerInfo, ...props }) => {
  const { checkToken } = useToken();
  const isAuth = checkToken({ login, id });

  if (!id) {
    useEffect(getManagerInfo, []);
  }

  return <PrivateRouteComponent isLoaded={isManagerInfoLoaded} isAuth={isAuth} {...props} />;
};

PrivateRouteContainer.propTypes = propTypes;

const props = ({ user }) => ({
  id: user.id,
  login: user.login,
  isManagerInfoLoaded: user.isManagerInfoLoaded,
});

const actions = {
  getManagerInfo: getManagerInfoActions,
};

export default connect(props, actions)(PrivateRouteContainer);
