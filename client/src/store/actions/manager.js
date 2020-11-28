export const SET_USER_INFO = 'SET_USER_INFO';

export const setUserInfoActions = ({ id, login, isAdmin }) => (
  dispatch
) => {
  dispatch({
    type: SET_USER_INFO,
    payload: { id, login, isAdmin },
  });
};
