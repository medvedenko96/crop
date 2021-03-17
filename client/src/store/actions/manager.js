import { manager } from '../../api';

const MANAGER = 'MANAGER';
export const SET_INFO = `${MANAGER}_SET_INFO`;

export const setManagerInfoActions = (managerInfo) => (dispatch) => {
  dispatch({
    type: SET_INFO,
    payload: { ...managerInfo },
  });
};

export const getManagerInfoActions = () => async (dispatch) => {
  const managerInfo = await manager.getManagerByJWT();

  dispatch({ type: SET_INFO, payload: { ...managerInfo, isManagerInfoLoaded: false } });
};
