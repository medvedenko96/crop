export const SET_USER_INFO = 'SET_USER_INFO';

export const setUserInfoActions = ({ id, username, companyName, isAdmin }) => dispatch => {
  dispatch({ type: SET_USER_INFO, payload: { id, username, companyName, isAdmin } });
};
