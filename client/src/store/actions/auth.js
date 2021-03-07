import { auth } from '../../api';

import useToken from '../../helpers/useToken';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const loginManagerActions = (userInfo) => async (dispatch) => {
  const data = await auth.mangerLogin(userInfo);
  const { setToken } = useToken();

  if (data.login && data.id) {
    setToken(data);
  }

  dispatch({ type: LOGIN });

  return data;
};

export const logoutActions = (userInfo) => async (dispatch) => {
  await auth.mangerLogin(userInfo);
  dispatch({ type: LOGOUT });
};
