import React, { useEffect } from 'react';
import { func, number, string, bool } from 'prop-types';
import { connect } from 'react-redux';

/* @Actions */
import { getManagerInfoActions } from '../../store/manager/actions';

/* @Component */
import PrivateRouteComponent from './PrivateRouteComponent';

/* @Helpers */
import useToken from '../../helpers/useToken';

const propTypes = {
    id: number,
    login: string,
    isManagerInfoLoaded: bool,
    getManagerInfo: func
};

const PrivateRouteContainer = ({ id, login, isManagerInfoLoaded, getManagerInfo, ...props }) => {
    if (!id) {
        useEffect(getManagerInfo, []);
    }

    const { checkToken } = useToken();
    const isAuth = checkToken({ login, id });

    return <PrivateRouteComponent isLoaded={isManagerInfoLoaded} isAuth={isAuth} {...props} />;
};

PrivateRouteContainer.propTypes = propTypes;

const mapStateToProps = ({ user }) => ({
    id: user.id,
    login: user.login,
    isManagerInfoLoaded: user.isManagerInfoLoaded
});

const mapDispatchToProps = {
    getManagerInfo: getManagerInfoActions
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRouteContainer);
