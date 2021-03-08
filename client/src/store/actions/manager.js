import { manager } from '../../api';

const MANAGER = 'MANAGER';

export const SET_INFO = `${MANAGER}_SET_INFO`;
export const SET_IS_LOADED = `${MANAGER}_SET_IS_LOADED`;

export const setIsLoaded = (isManagerInfoLoaded) => ({ type: SET_IS_LOADED, payload: { isManagerInfoLoaded } });

export const setManagerInfoActions = (managerInfo) => (dispatch) => {
  dispatch({
    type: SET_INFO,
    payload: { ...managerInfo },
  });
};

export const getManagerInfoActions = () => async (dispatch) => {
  dispatch(setIsLoaded(true));
  const managerInfo = await manager.getManagerByJWT();

  dispatch({ type: SET_INFO, payload: { ...managerInfo, isManagerInfoLoaded: false } });
};
