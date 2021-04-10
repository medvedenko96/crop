import React from 'react';
import { connect } from 'react-redux';

/* @Components */
import DashboardPageComponent from './DashboardPageComponent';

const propTypes = {};

const DashboardContainer = () => {
	return <DashboardPageComponent />;
};

DashboardContainer.propTypes = propTypes;

DashboardContainer.defaultProps = {};

export default connect(null, null)(DashboardContainer);
