export const SET_USER_INFO = 'SET_USER_INFO';

export const setManagerInfoActions = (managerInfo) => (dispatch) => {
  dispatch({
    type: SET_USER_INFO,
    payload: { ...managerInfo },
  });
};
