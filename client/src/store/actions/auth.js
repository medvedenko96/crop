import { auth } from '../../api';

const LOGIN = 'LOGIN';

export const createUserActions = (date) => async (dispatch) => {
  await auth.createUser(date);
};

export const loginActions = (date) => async (dispatch) => {
  const { username, companyName } = await auth.login(date);

  dispatch({
    type: LOGIN,
    payload: {
      username,
      companyName,
      isLogin: !!username,
    },
  });

  return !!username;
};
