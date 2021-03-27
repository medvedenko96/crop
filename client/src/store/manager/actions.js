/* @Api */
import { auth, manager } from '../../api';
/* @Constants */
import { SET_MANAGER_INFO, LOGIN_MANAGER, LOGOUT } from './constants';

/* @Helpers */
import useToken from '../../helpers/useToken';

export const setManagerInfoActions = (managerInfo) => (dispatch) => {
    dispatch({
        type: SET_MANAGER_INFO,
        payload: { ...managerInfo }
    });
};

export const getManagerInfoActions = () => async (dispatch) => {
    const managerInfo = await manager.getManagerByJWT();

    dispatch({ type: SET_MANAGER_INFO, payload: { ...managerInfo, isManagerInfoLoaded: false } });
};

export const loginManagerActions = (userInfo) => async (dispatch) => {
    const data = await auth.mangerLogin(userInfo);
    const { setToken } = useToken();

    if (data?.login && data?.id) {
        setToken(data);
        dispatch({ type: LOGIN_MANAGER, payload: { ...data, isManagerInfoLoaded: false } });
    }

    return data;
};

export const logoutActions = (userInfo) => async (dispatch) => {
    await auth.mangerLogin(userInfo);
    dispatch({ type: LOGOUT });
};
