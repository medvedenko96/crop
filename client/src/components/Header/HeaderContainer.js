import React from 'react';
import { connect } from 'react-redux';

/* @Components */
import HeaderComponent from './HeaderComponent';

const propTypes = {};

const HeaderContainer = () => {
	return <HeaderComponent />;
};

HeaderContainer.propTypes = propTypes;

HeaderContainer.defaultProps = {};

export default connect(null, null)(HeaderContainer);
