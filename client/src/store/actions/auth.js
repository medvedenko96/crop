import { auth } from '../../api';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const loginActions = (date) => async (dispatch) => {
  const data = await auth.login(date);

  dispatch({ type: LOGIN });

  return data;
};

export const logoutActions = (date) => async (dispatch) => {
  await auth.login(date);
  dispatch({ type: LOGOUT });
};

