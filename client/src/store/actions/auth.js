import { auth } from '../../api';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const loginActions = (date) => async (dispatch) => {
  const data = await auth.mangerLogin(date);

  dispatch({ type: LOGIN });

  return data;
};

export const logoutActions = (date) => async (dispatch) => {
  await auth.mangerLogin(date);
  dispatch({ type: LOGOUT });
};

