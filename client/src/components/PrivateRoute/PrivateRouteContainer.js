import React, { useEffect } from 'react';
import { func, number, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

/* @Actions */
import { getManagerInfoActions } from 'store/user/actions';

/* @Component */
import PrivateRouteComponent from './PrivateRouteComponent';

/* @Helpers */
import useToken from 'helpers/useToken';

const propTypes = {
	id: number,
	login: string,
	isInfoLoaded: bool,
	getManagerInfo: func,
	isCompany: bool,
};

const PrivateRouteContainer = ({
	id,
	login,
	isInfoLoaded,
	getManagerInfo,
	isCompany,
	...props
}) => {
	const intl = useIntl();

	if (!id) {
		useEffect(getManagerInfo, []);
	}

	const { checkToken } = useToken();
	const isAuth = checkToken({ login, id });

	return (
		<PrivateRouteComponent
			intl={intl}
			isLoaded={isInfoLoaded}
			isAuth={isAuth}
			isCompany={isCompany}
			{...props}
		/>
	);
};

PrivateRouteContainer.propTypes = propTypes;

const mapStateToProps = ({ user }) => ({
	id: user.id,
	login: user.login,
	isInfoLoaded: user.isInfoLoaded,
	isCompany: user.isCompany,
});

const mapDispatchToProps = {
	getManagerInfo: getManagerInfoActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRouteContainer);
